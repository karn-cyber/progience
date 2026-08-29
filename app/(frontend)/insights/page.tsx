import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContextualCTA, PageHero, SectionIntro } from "@/components/ui";
import { insights } from "@/lib/content";

export const metadata: Metadata = { title: "Insights", description: "Practical perspectives on GCC capability, engineering, quality, digital trust, AI and connected technology capability." };
export default function InsightsPage() { return <main><PageHero eyebrow="Authority and discovery" title="Useful answers to real technology capability questions." intro="Insights provide standalone value first. Each perspective then connects readers to the relevant capability, proof and next step." crumbs={[{ label: "Insights" }]} />
  <section className="section section-mist"><div className="shell"><SectionIntro eyebrow="Anchor perspectives" title="Six questions shaping the capability agenda." /><div className="insight-grid landing-grid">{insights.map((item) => <Link href={`/insights/${item.category}/${item.slug}`} key={item.slug}><span>{item.category.replaceAll("-"," ")}</span><h2>{item.title}</h2><p>{item.summary}</p><strong>Read perspective <ArrowRight size={16} /></strong></Link>)}</div></div></section>
  <ContextualCTA title="Which technology capability question matters most now?" body="Explore a related capability or start a contextual conversation with Progience." href="/contact?intent=technology_capability&source=insights" label="Discuss the issue" />
  </main>; }

