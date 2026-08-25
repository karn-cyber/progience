import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { ContextualCTA, PageHero, ProofStandard, SectionIntro } from "@/components/ui";

export const metadata: Metadata = { title: "Why Progience", description: "Why connected technology capability, enterprise discipline and evidence matter when evaluating Progience." };
const reasons = [
  ["Integrated capability", "Connect the required disciplines around one customer outcome."],
  ["Technology + talent", "Treat specialist people and engineering execution as related capability questions."],
  ["Lifecycle coverage", "Support capability from formation and scale through operation and evolution."],
  ["Quality and trust", "Build assurance and confidence into the delivery approach."],
  ["Practical innovation", "Connect emerging technology to feasible, responsible customer value."],
  ["Evidence discipline", "Separate verified capability and outcomes from future ambition."],
];
export default function WhyPage() { return <main><PageHero eyebrow="Why Progience" title="Connected capability should make progress more credible." intro="The difference is not the number of services available. It is the ability to connect the relevant capabilities around a customer problem, demonstrate how they work and make evidence visible." crumbs={[{label:"About",href:"/about"},{label:"Why Progience"}]} />
  <section className="section"><div className="shell"><SectionIntro eyebrow="Reasons to consider Progience" title="A disciplined capability proposition." /><div className="reason-card-grid">{reasons.map(([title,body])=><div key={title}><CheckCircle2 aria-hidden="true"/><h2>{title}</h2><p>{body}</p></div>)}</div></div></section>
  <section className="section section-mist"><div className="shell"><ProofStandard/></div></section>
  <section className="section"><div className="shell split-grid"><SectionIntro eyebrow="Evaluation principle" title="Ask what must connect for the outcome." body="A useful evaluation looks beyond individual service depth to the interactions among workforce, engineering, assurance, trust and operations."/><div className="note-panel"><strong>What Progience should never ask you to do</strong><p>Accept a strong capability, outcome, customer or market claim without an evidence path appropriate to that claim.</p><Link className="text-link" href="/about/enterprise-readiness">Review enterprise readiness <span aria-hidden="true">→</span></Link></div></div></section>
  <ContextualCTA title="What would give you confidence to move forward?" body="Discuss the capability need, evaluation criteria and proof required for a meaningful next step." href="/contact?intent=technology_capability&source=why-progience" label="Start the conversation" />
  </main>; }

