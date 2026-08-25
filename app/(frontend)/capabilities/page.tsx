import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ConnectedSystem, ContextualCTA, PageHero, SectionIntro } from "@/components/ui";
import { capabilities, capabilityMap } from "@/lib/content";

export const metadata: Metadata = { title: "Capabilities", description: "Explore the workforce, engineering, trust, emerging technology, application support and quality capabilities behind Progience solutions." };

export default function CapabilitiesPage() {
  return <main><PageHero eyebrow="Delivery capabilities" title="Six capabilities that work better together." intro="Each discipline has depth of its own. The real value appears when the right combination is shaped around a live technology challenge." crumbs={[{ label: "Capabilities" }]} />
    <section className="section"><div className="shell connected-grid"><ConnectedSystem /><div><SectionIntro eyebrow="The capability system" title="Depth where it matters. Connection where the outcome demands it." body="Each capability has a clear role, maturity and evidence path. The relevant combination changes with the problem." /><Link className="button button-navy" href="/contact?intent=technology_capability">Discuss a capability need</Link></div></div></section>
    <section className="section section-mist"><div className="shell"><div className="capability-card-grid landing-grid">{capabilities.map((item) => <Link href={`/capabilities/${item.slug}`} key={item.slug}><span>{item.maturity}</span><h2>{item.title}</h2><p>{item.role}</p><div className="tag-row">{item.outcomes.map((outcome) => <em key={outcome}>{outcome}</em>)}</div><strong>Explore capability <ArrowRight size={16} /></strong></Link>)}</div></div></section>
    <section className="section"><div className="shell"><SectionIntro eyebrow="From problem to outcome" title="See how multiple capabilities combine." /><div className="mapping-table" role="table" aria-label="Problem to capability mapping"><div role="row" className="mapping-head"><span role="columnheader">Customer problem</span><span role="columnheader">Solution</span><span role="columnheader">Capabilities</span><span role="columnheader">Outcome</span></div>{capabilityMap.map((row) => <div role="row" key={row.problem}><span role="cell">{row.problem}</span><span role="cell">{row.solution}</span><span role="cell">{row.capabilities}</span><span role="cell">{row.outcome}</span></div>)}</div></div></section>
    <ContextualCTA title="Which capabilities should connect around your challenge?" body="Start with the outcome. We will help identify the disciplines that matter and the evidence required." href="/contact?intent=technology_capability" label="Discuss the capability mix" />
  </main>;
}
