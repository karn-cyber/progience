import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { ContextualCTA, OutcomeList, PageHero, ProofStandard, SectionIntro } from "@/components/ui";
import { capabilities, getCapability, solutions } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return capabilities.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const item = getCapability((await params).slug); if (!item) return {}; return { title: item.title, description: item.role, openGraph: { title: `${item.title} | Progience`, description: item.role, images: ["/og.png"] }, twitter: { title: `${item.title} | Progience`, description: item.role, images: ["/og.png"] } }; }

export default async function CapabilityPage({ params }: Props) {
  const item = getCapability((await params).slug); if (!item) notFound(); const related = solutions.filter((solution) => item.relatedSolutions.includes(solution.slug));
  const intent = item.slug === "workforce" ? "workforce" : item.slug === "digital-trust" || item.slug === "quality-engineering" ? "quality_trust" : item.slug === "application-support" ? "application_support" : "engineering";
  return <main><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", name: item.title, description: item.role, provider: { "@id": "https://progience.com/#organization" }, url: `https://progience.com/capabilities/${item.slug}`, areaServed: "Worldwide" }).replace(/</g, "\\u003c") }} /><PageHero eyebrow={`${item.maturity} capability`} title={item.title} intro={item.role} crumbs={[{ label: "Capabilities", href: "/capabilities" }, { label: item.title }]} actions={<Link className="button button-primary" href={`/contact?intent=${intent}&source=capabilities/${item.slug}`}>Discuss this capability</Link>} />
    <section className="section"><div className="shell split-grid"><SectionIntro eyebrow="Where it helps" title="Problems this capability can address" body="The useful question is not what sits inside a service line. It is what this capability changes for the customer." /><OutcomeList items={item.problems} /></div></section>
    <section className="section section-mist"><div className="shell"><SectionIntro eyebrow="Capability depth" title="Core competency areas" /><div className="use-case-grid">{item.competencies.map((value, index) => <div key={value}><span>{String(index+1).padStart(2,"0")}</span><h3>{value}</h3></div>)}</div></div></section>
    <section className="section"><div className="shell split-grid"><SectionIntro eyebrow="Value" title="Outcomes this capability supports" body="Outcome statements remain directional until connected to approved customer or engagement evidence." /><div className="outcome-panel"><span>Outcome territories</span><OutcomeList items={item.outcomes} /></div></div></section>
    <section className="section section-navy"><div className="shell"><SectionIntro eyebrow="Related solutions" title="Capability becomes meaningful in context." /><div className="dark-card-grid">{related.map((solution) => <Link href={`/solutions/${solution.slug}`} key={solution.slug}><span>{solution.title}</span><h3>{solution.need}</h3><p>{solution.promise}</p><ArrowRight aria-hidden="true" /></Link>)}</div></div></section>
    <section className="section section-mist"><div className="shell"><ProofStandard /></div></section>
    <ContextualCTA title={`Explore how ${item.title} could support your outcome.`} body="Discuss the requirement, operating context and evidence needed to shape the right engagement." href={`/contact?intent=${intent}&source=capabilities/${item.slug}`} label="Start the conversation" />
  </main>;
}
