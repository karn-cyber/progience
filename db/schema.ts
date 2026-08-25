import { boolean, index, integer, pgSchema, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const app = pgSchema("app");
export const enquiryType = app.enum("enquiry_type", ["general", "technology_capability", "gcc", "workforce", "engineering", "quality_trust", "application_support", "other"]);
export const solution = app.enum("solution", ["build", "scale", "engineer", "assure", "operate", "evolve"]);
export const capability = app.enum("capability", ["workforce", "digital_engineering", "digital_trust", "emerging_technology", "application_support", "quality_engineering"]);
export const enquiryStatus = app.enum("enquiry_status", ["new", "qualifying", "qualified", "routed", "contacted", "disqualified", "closed"]);
export const notificationStatus = app.enum("notification_status", ["pending", "sent", "failed"]);

export const enquiries = app.table("enquiries", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  enquiryType: enquiryType("enquiry_type").notNull(), sourceContext: text("source_context"), solutionInterest: solution("solution_interest").array(), capabilityInterest: capability("capability_interest").array(),
  fullName: text("full_name").notNull(), workEmail: text("work_email").notNull(), company: text("company"), jobTitle: text("job_title"), phone: text("phone"), country: text("country"), message: text("message").notNull(),
  status: enquiryStatus("status").notNull().default("new"), consentPrivacy: boolean("consent_privacy").notNull().default(false), consentMarketing: boolean("consent_marketing").notNull().default(false), consentAt: timestamp("consent_at", { withTimezone: true }),
  utmSource: text("utm_source"), utmMedium: text("utm_medium"), utmCampaign: text("utm_campaign"), referrer: text("referrer"), landingPage: text("landing_page"), ipHash: text("ip_hash"), userAgent: text("user_agent"), isSpam: boolean("is_spam").notNull().default(false), idempotencyKey: text("idempotency_key").notNull().unique(),
}, (table) => [index("enquiries_status_created_idx").on(table.status, table.createdAt), index("enquiries_type_idx").on(table.enquiryType)]);

export const enquiryEvents = app.table("enquiry_events", { id: uuid("id").primaryKey().defaultRandom(), enquiryId: uuid("enquiry_id").notNull().references(() => enquiries.id, { onDelete: "cascade" }), eventType: text("event_type").notNull(), note: text("note"), actor: text("actor"), createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow() });
export const notificationJobs = app.table("notification_jobs", { id: uuid("id").primaryKey().defaultRandom(), enquiryId: uuid("enquiry_id").notNull().references(() => enquiries.id, { onDelete: "cascade" }), status: notificationStatus("status").notNull().default("pending"), attempts: integer("attempts").notNull().default(0), lastError: text("last_error"), nextAttemptAt: timestamp("next_attempt_at", { withTimezone: true }).notNull().defaultNow(), createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(), updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow() });
export const rateLimits = app.table("rate_limits", { key: text("key").primaryKey(), windowStart: timestamp("window_start", { withTimezone: true }).notNull(), count: integer("count").notNull().default(1), updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow() });
export const careersApplications = app.table("careers_applications", { id: uuid("id").primaryKey().defaultRandom(), createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(), roleSlug: text("role_slug").notNull(), fullName: text("full_name").notNull(), email: text("email").notNull(), phone: text("phone"), resumeUrl: text("resume_url"), linkedinUrl: text("linkedin_url"), coverNote: text("cover_note"), status: text("status").notNull().default("received"), consentPrivacy: boolean("consent_privacy").notNull().default(false) });
export const insightSubscribers = app.table("insight_subscribers", { id: uuid("id").primaryKey().defaultRandom(), email: text("email").notNull().unique(), createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(), confirmedAt: timestamp("confirmed_at", { withTimezone: true }), confirmToken: text("confirm_token"), unsubscribedAt: timestamp("unsubscribed_at", { withTimezone: true }), source: text("source"), consentMarketing: boolean("consent_marketing").notNull().default(true) });
