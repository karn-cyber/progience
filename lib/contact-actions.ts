"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { eq, sql } from "drizzle-orm";
import { Resend } from "resend";
import { z } from "zod";
import { enquiries, enquiryEvents, notificationJobs, rateLimits } from "@/db/schema";
import { getAppDb } from "@/lib/database";

const enquiryTypes = ["general", "technology_capability", "gcc", "workforce", "engineering", "quality_trust", "application_support", "other"] as const;
const solutionTypes = ["build", "scale", "engineer", "assure", "operate", "evolve"] as const;
const capabilityTypes = ["workforce", "digital_engineering", "digital_trust", "emerging_technology", "application_support", "quality_engineering"] as const;
const enquirySchema = z.object({
  enquiryType: z.enum(enquiryTypes), sourceContext: z.string().max(200).optional(),
  solutionInterest: z.array(z.enum(solutionTypes)).max(6), capabilityInterest: z.array(z.enum(capabilityTypes)).max(6),
  fullName: z.string().trim().min(2, "Please enter your name.").max(100), workEmail: z.email("Please enter a valid work email.").max(160), company: z.string().trim().max(140).optional(), jobTitle: z.string().trim().max(120).optional(), phone: z.string().trim().max(40).optional(), country: z.string().trim().max(100).optional(),
  message: z.string().trim().min(20, "Please add a little more context (at least 20 characters).").max(4000), consentPrivacy: z.literal("on", { error: "Please accept the privacy notice." }), consentMarketing: z.string().optional(), companyWebsite: z.string().max(0).optional(), turnstileToken: z.string().optional(), utmSource: z.string().max(200).optional(), utmMedium: z.string().max(200).optional(), utmCampaign: z.string().max(200).optional(),
});

export type ContactState = { ok: boolean; message: string; fieldErrors?: Record<string, string[]>; preview?: boolean };
export const initialContactState: ContactState = { ok: false, message: "" };
const hash = (value: string) => createHash("sha256").update(value).digest("hex");

async function verifyTurnstile(token: string | undefined, ip?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return process.env.NODE_ENV !== "production";
  if (!token) return false;
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ secret, response: token, remoteip: ip }) });
  const result = await response.json() as { success?: boolean };
  return result.success === true;
}

export async function submitEnquiry(_previous: ContactState, formData: FormData): Promise<ContactState> {
  const raw = { enquiryType: String(formData.get("enquiryType") || "general"), sourceContext: String(formData.get("sourceContext") || ""), solutionInterest: formData.getAll("solutionInterest").map(String), capabilityInterest: formData.getAll("capabilityInterest").map(String), fullName: String(formData.get("fullName") || ""), workEmail: String(formData.get("workEmail") || ""), company: String(formData.get("company") || ""), jobTitle: String(formData.get("jobTitle") || ""), phone: String(formData.get("phone") || ""), country: String(formData.get("country") || ""), message: String(formData.get("message") || ""), consentPrivacy: String(formData.get("consentPrivacy") || ""), consentMarketing: String(formData.get("consentMarketing") || ""), companyWebsite: String(formData.get("companyWebsite") || ""), turnstileToken: String(formData.get("cf-turnstile-response") || ""), utmSource: String(formData.get("utm_source") || ""), utmMedium: String(formData.get("utm_medium") || ""), utmCampaign: String(formData.get("utm_campaign") || "") };
  if (raw.companyWebsite) return { ok: true, message: "Thank you. Your enquiry has been received." };
  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) return { ok: false, message: "Please review the highlighted information.", fieldErrors: parsed.error.flatten().fieldErrors };

  const headerList = await headers(); const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim(); const ipHash = ip ? hash(`${process.env.IP_HASH_SALT || "development-only"}:${ip}`) : undefined;
  if (!(await verifyTurnstile(parsed.data.turnstileToken, ip))) return { ok: false, message: "We could not verify this submission. Please try again." };
  const db = getAppDb();
  if (!db) return process.env.NODE_ENV === "production" ? { ok: false, message: "Submissions are temporarily unavailable. Please try again later." } : { ok: true, preview: true, message: "Preview submission validated. Connect the production database to activate delivery." };

  if (ipHash) {
    const rate = await db.select().from(rateLimits).where(eq(rateLimits.key, ipHash)).limit(1); const windowStart = rate[0]?.windowStart?.getTime() || 0; const reset = Date.now() - windowStart >= 10 * 60 * 1000;
    if (!reset && (rate[0]?.count || 0) >= 5) return { ok: false, message: "Too many submissions. Please wait a few minutes and try again." };
    await db.insert(rateLimits).values({ key: ipHash, windowStart: new Date(), count: 1 }).onConflictDoUpdate({ target: rateLimits.key, set: { count: reset ? 1 : sql`${rateLimits.count} + 1`, windowStart: reset ? new Date() : rate[0]?.windowStart, updatedAt: new Date() } });
  }

  const idempotencyKey = hash(`${parsed.data.workEmail.toLowerCase()}|${parsed.data.sourceContext}|${parsed.data.message}|${Math.floor(Date.now() / 300000)}`);
  const inserted = await db.insert(enquiries).values({ enquiryType: parsed.data.enquiryType, sourceContext: parsed.data.sourceContext, solutionInterest: parsed.data.solutionInterest, capabilityInterest: parsed.data.capabilityInterest, fullName: parsed.data.fullName, workEmail: parsed.data.workEmail.toLowerCase(), company: parsed.data.company, jobTitle: parsed.data.jobTitle, phone: parsed.data.phone, country: parsed.data.country, message: parsed.data.message, consentPrivacy: true, consentMarketing: parsed.data.consentMarketing === "on", consentAt: new Date(), utmSource: parsed.data.utmSource, utmMedium: parsed.data.utmMedium, utmCampaign: parsed.data.utmCampaign, referrer: headerList.get("referer"), ipHash, userAgent: headerList.get("user-agent"), idempotencyKey }).onConflictDoNothing().returning({ id: enquiries.id });
  if (!inserted[0]) return { ok: true, message: "Thank you. This enquiry has already been received." };
  const enquiryId = inserted[0].id; await db.insert(enquiryEvents).values({ enquiryId, eventType: "submitted", actor: "website" });

  const apiKey = process.env.RESEND_API_KEY; const to = process.env.ENQUIRY_NOTIFICATION_TO;
  if (apiKey && to) {
    try { const resend = new Resend(apiKey); await resend.emails.send({ from: process.env.ENQUIRY_NOTIFICATION_FROM || "Progience Website <website@progience.com>", to: [to], subject: `New ${parsed.data.enquiryType.replaceAll("_", " ")} enquiry`, text: `Name: ${parsed.data.fullName}\nEmail: ${parsed.data.workEmail}\nCompany: ${parsed.data.company || "Not provided"}\nSource: ${parsed.data.sourceContext || "Direct"}\n\n${parsed.data.message}` }); await db.insert(enquiryEvents).values({ enquiryId, eventType: "notification_sent", actor: "resend" }); }
    catch (error) { await db.insert(notificationJobs).values({ enquiryId, status: "pending", lastError: error instanceof Error ? error.message.slice(0, 500) : "Notification failed" }); }
  } else await db.insert(notificationJobs).values({ enquiryId, status: "pending", lastError: "Notification routing is not configured" });
  return { ok: true, message: "Thank you. Your enquiry has been received and routed for review." };
}
