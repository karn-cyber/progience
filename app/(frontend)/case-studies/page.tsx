import type { Metadata } from "next";
import Link from "next/link";
import { ContextualCTA, PageHero, SectionIntro } from "@/components/ui";

export const metadata: Metadata = { title: "Case Studies", description: "Evidence-backed Progience customer stories and technology capability outcomes.", alternates: { canonical: "/case-studies" } };
export default function CaseStudiesPage() { return <main><PageHero eyebrow="Proof" title="Evidence before assertion." intro="Customer stories belong here only after the engagement, outcome, wording and permission have been validated." crumbs={[{ label: "Case studies" }]} />
  <section className="section"><div className="shell empty-state"><span>Proof library</span><h2>Approved case studies are being prepared for publication.</h2><p>No customer story, logo, metric or testimonial will be presented as proof until its source, owner and permission status are confirmed.</p><div><Link className="button button-navy" href="/about/enterprise-readiness">View enterprise readiness</Link><Link className="text-link" href="/capabilities">Explore current capabilities <span aria-hidden="true">→</span></Link></div></div></section>
  <section className="section section-mist"><div className="shell"><SectionIntro eyebrow="Publication standard" title="Every future case study will answer the same questions." /><div className="use-case-grid">{["What was the customer context?","What needed to change?","What did Progience actually do?","Which capabilities were combined?","What evidence supports the outcome?","What can be stated publicly?"].map((item,index)=><div key={item}><span>{String(index+1).padStart(2,"0")}</span><h3>{item}</h3></div>)}</div></div></section>
  <ContextualCTA title="Facing a similar technology capability challenge?" body="Start with your context. We will discuss relevant capability without relying on unsupported claims." href="/contact?intent=technology_capability&source=case-studies" label="Discuss your challenge" />
  </main>; }

