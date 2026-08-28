import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { ContextualCTA, OutcomeList, PageHero, ProofStandard, SectionIntro } from "@/components/ui";
import { capabilities, getSolution, solutions } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return solutions.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getSolution((await params).slug); if (!item) return {};
  return { title: `${item.title} Technology Capability`, description: item.promise, alternates: { canonical: `/solutions/${item.slug}` }, openGraph: { title: `${item.title} Technology Capability | Progience`, description: item.promise, images: ["/og.png"] }, twitter: { title: `${item.title} Technology Capability | Progience`, description: item.promise, images: ["/og.png"] } };
}

export default async function SolutionPage({ params }: Props) {
  const item = getSolution((await params).slug); if (!item) notFound();
  const relatedCapabilities = capabilities.filter((capability) => item.capabilities.some((name) => capability.title.startsWith(name) || capability.title.includes(name)));
  return <main><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", name: `${item.title} Technology Capability`, description: item.promise, provider: { "@id": "https://progience.com/#organization" }, url: `https://progience.com/solutions/${item.slug}`, areaServed: "Worldwide" }).replace(/</g, "\\u003c") }} /><PageHero eyebrow={`${item.title} technology capability`} title={item.promise} intro={item.challenge} crumbs={[{ label: "Solutions", href: "/solutions" }, { label: item.title }]} actions={<><Link className="button button-primary" href={`/contact?intent=${item.intent}&source=solutions/${item.slug}`}>Discuss a {item.title.toLowerCase()} challenge</Link><Link className="button button-secondary" href="#capabilities">See the capability mix</Link></>} />
    <section className="section"><div className="shell split-grid"><SectionIntro eyebrow="Why it matters" title={item.challenge} body="Treating the loudest symptom rarely fixes the underlying constraint. The response has to work across the wider capability system." /><div className="outcome-panel"><span>Intended outcomes</span><OutcomeList items={item.outcome} /></div></div></section>
    <section className="section section-mist"><div className="shell"><SectionIntro eyebrow="Where this applies" title={`Use ${item.title} when you need to…`} /><div className="use-case-grid">{item.useCases.map((useCase, index) => <div key={useCase}><span>{String(index + 1).padStart(2,"0")}</span><h3>{useCase}</h3></div>)}</div></div></section>
    <section className="section" id="capabilities"><div className="shell"><SectionIntro eyebrow="Capability combination" title="Connect the disciplines required for the outcome." body="The exact mix is shaped by context and validated during discovery." /><div className="capability-card-grid">{relatedCapabilities.map((capability) => <Link href={`/capabilities/${capability.slug}`} key={capability.slug}><span>{capability.maturity}</span><h3>{capability.title}</h3><p>{capability.role}</p><strong>Explore capability <ArrowRight size={16} /></strong></Link>)}</div></div></section>
    <section className="section section-navy"><div className="shell"><SectionIntro eyebrow="How we work" title="Move from context to measurable capability." /><div className="process-grid">{item.approach.map((step, index) => <div key={step}><span>{String(index + 1).padStart(2,"0")}</span><h3>{step}</h3></div>)}</div></div></section>
    <section className="section section-mist"><div className="shell"><ProofStandard /></div></section>
    <ContextualCTA title={`What do you need to ${item.title.toLowerCase()}?`} body="Share the operating context, constraint and intended outcome. We will route the conversation to the relevant capability owners." href={`/contact?intent=${item.intent}&source=solutions/${item.slug}`} label={`Discuss ${item.title.toLowerCase()}`} />
  </main>;
}
