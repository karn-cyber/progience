import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContextualCTA, PageHero, ProofStandard, SectionIntro } from "@/components/ui";
import { industries } from "@/lib/content";

export const metadata: Metadata = { title: "Industries", description: "Evidence-led technology capability for enterprise and technology product environments.", alternates: { canonical: "/industries" } };
export default function IndustriesPage() { return <main><PageHero eyebrow="Customer environments" title="Technology work changes with the environment." intro="Progience currently focuses on enterprise and technology product settings where the capability fit is clear and the story can be supported responsibly." crumbs={[{ label: "Industries" }]} />
  <section className="section"><div className="shell"><SectionIntro eyebrow="P0 customer worlds" title="Two evidence-gated market contexts." /><div className="industry-grid">{industries.map((item) => <Link href={`/industries/${item.slug}`} key={item.slug}><span>{item.label}</span><h2>{item.title}</h2><p>{item.intro}</p><strong>Explore context <ArrowRight size={16} /></strong></Link>)}</div></div></section>
  <section className="section section-mist"><div className="shell"><ProofStandard /></div></section>
  <ContextualCTA title="What is putting pressure on your technology organisation?" body="Share the context and the change you need to make. We will bring the relevant capability lead into the conversation." href="/contact?intent=technology_capability" label="Discuss your environment" />
  </main>; }
