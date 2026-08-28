import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContextualCTA, OutcomeList, PageHero, ProofStandard, SectionIntro } from "@/components/ui";
import { getIndustry, industries, solutions } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return industries.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const item = getIndustry((await params).slug); if (!item) return {}; return { title: item.title, description: item.intro, alternates: { canonical: `/industries/${item.slug}` }, openGraph: { title: `${item.title} | Progience`, description: item.intro, images: [] }, twitter: { title: `${item.title} | Progience`, description: item.intro, images: [] } }; }
export default async function IndustryPage({ params }: Props) { const item = getIndustry((await params).slug); if (!item) notFound(); const related = solutions.filter((solution) => item.solutions.includes(solution.title)); return <main><PageHero eyebrow={item.label} title={`Technology capability for ${item.title}`} intro={item.intro} crumbs={[{ label: "Industries", href: "/industries" }, { label: item.title }]} actions={<Link className="button button-primary" href={`/contact?intent=technology_capability&source=industries/${item.slug}`}>Discuss this environment</Link>} />
  <section className="section"><div className="shell split-grid"><SectionIntro eyebrow="Operating pressures" title="Customer realities shape the response." body="The technology capability model must account for the constraints and priorities of the environment it serves." /><OutcomeList items={item.pressures} /></div></section>
  <section className="section section-navy"><div className="shell"><SectionIntro eyebrow="Relevant solutions" title="Start with the outcome that must change." /><div className="dark-card-grid">{related.map((solution) => <Link href={`/solutions/${solution.slug}`} key={solution.slug}><span>{solution.title}</span><h3>{solution.need}</h3><p>{solution.promise}</p></Link>)}</div></div></section>
  <section className="section section-mist"><div className="shell"><ProofStandard /></div></section>
  <ContextualCTA title={`Discuss technology capability in a ${item.title.toLowerCase()} context.`} body="Share the pressure, current constraint and outcome that matters. We will identify the most relevant next conversation." href={`/contact?intent=technology_capability&source=industries/${item.slug}`} label="Start the conversation" />
  </main>; }

