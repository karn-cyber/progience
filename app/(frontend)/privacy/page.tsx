import { LegalPage } from "@/components/legal-page";

export const metadata = { title: "Privacy" };
export default function PrivacyPage() {
  return <LegalPage eyebrow="Privacy" title="Privacy notice" introduction="How website enquiries, consent and analytics data are handled." reviewNote="Final controller details, lawful bases and retention periods require privacy/legal approval before production." sections={[
    { heading: "Information we collect", body: "We collect information you choose to provide in enquiry, subscription and career forms, together with limited source, device and security data needed to operate those services." },
    { heading: "How information is used", body: "Information is used to respond to requests, route enquiries, secure the website and measure aggregate performance. Marketing communication is sent only when you agree to receive it." },
    { heading: "Your choices", body: "Marketing consent is optional and separate from the privacy acknowledgement. You may request access, correction or deletion using the contact channel published with the final policy." },
    { heading: "Retention and processors", body: "Retention periods are configurable and will be approved before launch. Approved processors may support hosting, storage, analytics, email delivery and application handling under appropriate controls." },
  ]} />;
}
