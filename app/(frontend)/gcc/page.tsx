import type { Metadata } from "next";
import Link from "next/link";
import { ContextualCTA, PageHero, ProofStandard, SectionIntro } from "@/components/ui";
import { capabilities } from "@/lib/content";

export const metadata: Metadata = { title: "GCC Technology Capability", description: "A capability-first path to strategise, establish, build, scale, optimise and transform GCC technology capability.", alternates: { canonical: "/gcc" } };
const stages = [
  ["Strategise", "Clarify ambition, context and capability priorities where Progience expertise is established."],
  ["Establish", "Create the initial workforce and operating foundations required to begin."],
  ["Build", "Develop engineering, quality, trust and application capability around the mission."],
  ["Scale", "Increase capacity while protecting quality, governance and execution."],
  ["Optimise", "Improve productivity, reliability, quality and operating insight."],
  ["Transform", "Modernise and adopt emerging technology where capability and evidence support it."],
];
export default function GCCPage() { return <main><PageHero eyebrow="GCC technology capability" title="Build a GCC that gets stronger as it grows." intro="The best GCCs develop more than headcount. They connect talent, engineering, quality, trust and operations around a clear technology mission." crumbs={[{ label: "GCC" }]} actions={<Link className="button button-primary" href="/contact?intent=gcc&source=gcc">Discuss GCC capability</Link>} />
  <section className="section"><div className="shell"><SectionIntro eyebrow="The GCC lifecycle" title="From ambition to evolving technology capability." body="The sequence is directional. The appropriate starting point depends on the organisation’s existing maturity and evidence." /><div className="lifecycle-grid">{stages.map(([title, body], index) => <div key={title}><span>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{body}</p></div>)}</div></div></section>
  <section className="section section-navy"><div className="shell"><SectionIntro eyebrow="Capability architecture" title="The GCC story connects the full capability system." /><div className="dark-card-grid">{capabilities.map((item) => <Link href={`/capabilities/${item.slug}`} key={item.slug}><span>{item.maturity}</span><h3>{item.title}</h3><p>{item.role}</p></Link>)}</div></div></section>
  <section className="section section-mist"><div className="shell"><ProofStandard /></div></section>
  <section className="section"><div className="shell split-grid"><SectionIntro eyebrow="Engagement" title="Meet the GCC where it is today." body="Strategy, establishment, scale and transformation call for different kinds of help. The right starting point is the one that matches the current constraint." /><div className="note-panel"><strong>Capability comes first</strong><p>We start with the GCC mission and the work it must own. Team shape follows from that conversation.</p></div></div></section>
  <ContextualCTA title="Where are you in the GCC capability lifecycle?" body="Share the current stage and what needs to change. We will route the enquiry to the relevant GCC capability conversation." href="/contact?intent=gcc&source=gcc" label="Talk about GCC capability" />
  </main>; }
