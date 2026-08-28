import { LegalPage } from "@/components/legal-page";
export const metadata = { title: "Accessibility", alternates: { canonical: "/accessibility" } };
export default function AccessibilityPage() { return <LegalPage eyebrow="Accessibility" title="Accessibility commitment" introduction="Progience is building an inclusive experience against WCAG 2.2 AA." sections={[
  { heading: "Our standard", body: "The interface is designed for keyboard access, visible focus, sufficient contrast, responsive zoom, reduced motion and meaningful structure for assistive technology." },
  { heading: "Continuous testing", body: "Automated checks are supplemented by manual keyboard, screen-reader, zoom, form and reduced-motion testing before release and during material updates." },
  { heading: "Report a barrier", body: "If a part of the website prevents access, contact Progience with the page and the difficulty encountered. The final statement will include an approved response channel and target timeframe." },
]} />; }
