import { LegalPage } from "@/components/legal-page";
export const metadata = { title: "Security" };
export default function SecurityPage() { return <LegalPage eyebrow="Trust" title="Website security" introduction="The controls used to protect the public website and submitted information." reviewNote="This page deliberately avoids unsupported certifications or maturity claims. Final disclosure and incident contacts require owner approval." sections={[
  { heading: "Platform controls", body: "The production design uses secure transport, restrictive browser headers, protected administration, least-privilege roles, managed secrets and logged publishing activity." },
  { heading: "Form protection", body: "Public submissions use server-side validation, abuse controls, rate limiting, idempotency safeguards and retryable notification handling." },
  { heading: "Operational assurance", body: "Dependency review, backups, recovery rehearsal, private-file access testing and a documented rollback path are required launch gates." },
  { heading: "Responsible reporting", body: "A verified security contact and coordinated disclosure process will be published when approved by the accountable Progience owner." },
]} />; }
