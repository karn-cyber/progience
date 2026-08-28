import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContextualCTA, PageHero, SectionIntro } from "@/components/ui";
import { solutions } from "@/lib/content";

export const metadata: Metadata = { title: "Solutions", description: "Build, Scale, Engineer, Assure, Operate and Evolve technology capability around the outcomes your organisation needs.", alternates: { canonical: "/solutions" } };

export default function SolutionsPage() {
  return <main><PageHero eyebrow="Customer solutions" title="Start with the move you need to make." intro="Six starting points help turn a broad technology challenge into a focused conversation and a practical capability mix." crumbs={[{ label: "Solutions" }]} actions={<Link className="button button-primary" href="/contact?intent=technology_capability">Discuss your challenge</Link>} />
    <section className="section section-mist"><div className="shell"><div className="solution-grid landing-grid">{solutions.map((item, index) => <Link href={`/solutions/${item.slug}`} className="solution-card" key={item.slug}><span>{String(index + 1).padStart(2,"0")}</span><h2>{item.title}</h2><p>{item.need}</p><strong>{item.promise}</strong><div className="tag-row">{item.outcome.map((outcome) => <em key={outcome}>{outcome}</em>)}</div><ArrowRight aria-hidden="true" /></Link>)}</div></div></section>
    <section className="section"><div className="shell"><SectionIntro eyebrow="A connected response" title="One problem may require several capabilities." body="Solutions are the customer-facing story. Capabilities are the delivery backbone. The website keeps those layers clear while showing how they connect." /><div className="comparison-flow"><div><span>01</span><strong>Customer problem</strong><p>What is changing or constrained?</p></div><div><span>02</span><strong>Solution</strong><p>What should the response accomplish?</p></div><div><span>03</span><strong>Capabilities</strong><p>What combination makes delivery possible?</p></div><div><span>04</span><strong>Proof & outcome</strong><p>Why believe it, and what changes?</p></div></div></div></section>
    <ContextualCTA title="Not sure which solution fits?" body="Start with the constraint you are facing. We will help frame the most relevant capability conversation." href="/contact?intent=technology_capability" label="Discuss the challenge" />
  </main>;
}
