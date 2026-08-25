import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Contact", description: "Start the right technology capability conversation with Progience." };
type Props = { searchParams: Promise<{ intent?: string; source?: string }> };
export default async function ContactPage({ searchParams }: Props) { const query = await searchParams; const intent = query.intent || "general"; const source = query.source || `contact/${intent}`; return <main><PageHero eyebrow="Start the right conversation" title="Tell us what is getting in the way." intro="A little context helps us bring the right Progience people into the first conversation." crumbs={[{label:"Contact"}]} />
  <section className="section section-mist"><div className="shell contact-grid"><div className="contact-aside"><span>What happens next</span><h2>A useful first conversation, with the right people.</h2><ol><li><strong>1</strong><p>We read the context and the outcome you are working toward.</p></li><li><strong>2</strong><p>We involve the capability lead closest to the problem.</p></li><li><strong>3</strong><p>Together, we decide whether there is a sensible next step.</p></li></ol><p className="privacy-note">Job applications stay in the Careers journey and never enter this business enquiry flow.</p></div><ContactForm intent={intent} source={source}/></div></section>
  </main> }
