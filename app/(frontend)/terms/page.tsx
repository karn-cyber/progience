import { LegalPage } from "@/components/legal-page";
export const metadata = { title: "Terms of Use", alternates: { canonical: "/terms" } };
export default function TermsPage() { return <LegalPage eyebrow="Legal" title="Terms of use" introduction="The conditions for using Progience website content and services." reviewNote="Entity details, governing law and approved legal wording remain a production gate." sections={[
  { heading: "Website use", body: "The website is provided for general business information. You must not misuse, disrupt or attempt unauthorised access to the service." },
  { heading: "Content and intellectual property", body: "Unless stated otherwise, website content and brand assets remain the property of their respective owners and may not be reused without permission." },
  { heading: "No professional guarantee", body: "Published material is general information, not a binding proposal or professional guarantee. A formal engagement is governed by its signed agreement." },
  { heading: "External services", body: "Links to external services are supplied for convenience. Their availability and policies are controlled by their respective operators." },
]} />; }
