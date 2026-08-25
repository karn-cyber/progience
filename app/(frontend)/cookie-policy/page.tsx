import { LegalPage } from "@/components/legal-page";
export const metadata = { title: "Cookie Policy" };
export default function CookiePolicyPage() { return <LegalPage eyebrow="Privacy" title="Cookie policy" introduction="A clear account of storage used by the website." reviewNote="The final inventory will be generated from the production deployment and consent configuration." sections={[
  { heading: "Essential storage", body: "Essential storage may be used for security, form integrity and user preferences. It cannot be disabled where it is required for the service to function." },
  { heading: "Measurement", body: "The planned analytics configuration is privacy-conscious and avoids cross-site advertising profiles. Any non-essential measurement will follow the approved consent policy." },
  { heading: "Managing preferences", body: "Where optional storage is introduced, visitors will be able to make and revisit their choice through an accessible preference control." },
]} />; }
