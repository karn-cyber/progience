import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, Layers3, MoveRight, Rocket } from "lucide-react";
import { ConnectedSystem, ContextualCTA, ProofStandard, SectionIntro } from "@/components/ui";
import { capabilities, insights, solutions } from "@/lib/content";
import { CapabilityConsole } from "@/components/capability-console";

const faqs = [
  { question: "What is a Technology Capability Partner?", answer: "A Technology Capability Partner starts with the outcome and connects the people, engineering, quality, trust and operational disciplines needed to achieve it, instead of treating each as an isolated service." },
  { question: "Does Progience provide only technology workforce services?", answer: "No. Workforce is one part of a broader capability architecture that also includes digital engineering, quality engineering, digital trust, application support and emerging technology enablement." },
  { question: "How does a Progience engagement begin?", answer: "It begins with a defined challenge, operating context and intended outcome. The relevant capability mix, proof requirements and measures are then shaped around that need." },
];

export default function Home() {
  return (
    <main><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }).replace(/</g, "\\u003c") }} />
      <section className="hero">
        <div className="shell hero-window">
          <div className="hero-window-bar" aria-hidden="true"><span><i /><i /><i /></span><strong>Progience capability system</strong><small>Built around your outcome</small></div>
          <div className="hero-grid">
            <div className="hero-copy">
            <p className="eyebrow">Technology capability, joined up</p>
            <h1>Build. Scale. Evolve. <span>Move with confidence.</span></h1>
            <p className="hero-lead">
              When the roadmap moves faster than the organisation, another isolated supplier will not fix it. Progience brings the right people, engineering, quality, trust and support together around the work that matters now.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/contact?intent=technology_capability">Talk through the challenge</Link>
              <Link className="button button-secondary" href="/solutions">See how it fits together</Link>
            </div>
            <div className="solution-ribbon" aria-label="Customer solution areas">
              {['Build','Scale','Engineer','Assure','Operate','Evolve'].map((item) => <span key={item}>{item}</span>)}
            </div>
            </div>

            <CapabilityConsole />
          </div>
          <div className="hero-window-foot"><span>People</span><span>Engineering</span><span>Quality</span><span>Trust</span><span>Operations</span></div>
        </div>
      </section>

      <section className="tension-strip">
        <div className="shell tension-inner">
          <p>The roadmap is rarely the problem.</p>
          <strong>The hard part is getting every capability to move in the same direction.</strong>
        </div>
      </section>

      <section className="section response-section">
        <div className="shell split-grid">
          <SectionIntro eyebrow="How Progience helps" title="One business need. One joined-up response." body="Real technology problems cross team boundaries. We shape the mix around the work, then connect the specialists, engineering disciplines and controls needed to deliver it." />
          <div className="response-points">
            <div><Layers3 aria-hidden="true" /><strong>Get clear on the job</strong><span>We begin with what has to change, what is getting in the way and what success should look like.</span></div>
            <div><MoveRight aria-hidden="true" /><strong>Build the right team around it</strong><span>Only the capabilities that earn their place are brought into the engagement.</span></div>
            <div><CheckCircle2 aria-hidden="true" /><strong>Show the work</strong><span>Progress, risks and evidence stay visible from the first conversation onward.</span></div>
          </div>
        </div>
      </section>

      <section className="section section-mist">
        <div className="shell">
          <SectionIntro eyebrow="Where to start" title="Choose the move you need to make." body="Build something new, scale what is working, strengthen engineering, raise confidence, steady critical applications or prepare for what comes next." />
          <div className="solution-grid">
            {solutions.map((solution, index) => <Link href={`/solutions/${solution.slug}`} key={solution.slug} className="solution-card"><span>{String(index + 1).padStart(2, "0")}</span><h3>{solution.title}</h3><p>{solution.need}</p><strong>{solution.promise}</strong><ArrowRight aria-hidden="true" /></Link>)}
          </div>
        </div>
      </section>

      <section className="section connected-section">
        <div className="shell connected-grid">
          <ConnectedSystem />
          <div>
            <SectionIntro eyebrow="Connected capability" title="The shape changes with the challenge." body="A product launch, a GCC scale-up and an application recovery need different teams. The disciplines stay connected; the mix stays practical." />
            <div className="capability-tags">{capabilities.map((capability) => <Link href={`/capabilities/${capability.slug}`} key={capability.slug}>{capability.title.replace(" Services", "")}</Link>)}</div>
            <Link className="text-link" href="/capabilities">Explore the capability architecture <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="section section-navy audience-section">
        <div className="shell">
          <SectionIntro eyebrow="Where we work" title="Complex environments, made easier to navigate." body="The detail changes across enterprises, GCCs and product companies. The need for capable people and sound engineering does not." />
          <div className="audience-grid">
            <Link href="/industries/enterprise"><Building2 aria-hidden="true" /><span>Enterprise</span><h3>Navigate complexity with capability that connects delivery, trust and reliability.</h3><ArrowRight aria-hidden="true" /></Link>
            <Link href="/gcc"><Rocket aria-hidden="true" /><span>GCC</span><h3>Build a GCC that grows in capability as well as size.</h3><ArrowRight aria-hidden="true" /></Link>
            <Link href="/industries/technology-product"><Layers3 aria-hidden="true" /><span>Technology & Product</span><h3>Increase engineering capability while protecting product focus and quality.</h3><ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="section why-section">
        <div className="shell split-grid wide-left">
          <div>
            <SectionIntro eyebrow="Why Progience" title="Fewer hand-offs. Clearer ownership. Better work." />
            <Link className="button button-navy" href="/about/why-progience">Why work with Progience</Link>
          </div>
          <div className="reason-grid">
            {["Technology + talent", "Lifecycle coverage", "Quality and trust built in", "Practical innovation", "Enterprise discipline", "Evidence-led claims"].map((item) => <div key={item}><CheckCircle2 aria-hidden="true" /><strong>{item}</strong></div>)}
          </div>
        </div>
      </section>

      <section className="section section-mist proof-section"><div className="shell"><ProofStandard /></div></section>

      <section className="section engagement-section">
        <div className="shell">
          <SectionIntro eyebrow="How the relationship grows" title="Start where the pressure is. Earn the next step." body="A focused piece of work can grow into a wider capability partnership when the results support it." align="center" />
          <div className="engagement-flow">{[
            ["Land", "Begin with one well-defined requirement."],
            ["Expand", "Introduce an adjacent capability where it adds value."],
            ["Integrate", "Connect capabilities around a larger outcome."],
            ["Partner", "Develop a broader technology capability relationship."],
          ].map(([title, body], index) => <div key={title}><span>{index + 1}</span><h3>{title}</h3><p>{body}</p></div>)}</div>
        </div>
      </section>

      <section className="section section-mist insights-preview"><div className="shell"><SectionIntro eyebrow="Insights" title="Clear thinking for difficult technology decisions." body="Practical points of view written to be useful before a sales conversation ever starts." /><div className="insight-grid">{insights.slice(0,3).map((item) => <Link href={`/insights/${item.category}/${item.slug}`} key={item.slug}><span>{item.category.replaceAll("-", " ")}</span><h3>{item.title}</h3><p>{item.summary}</p><strong>Read perspective <ArrowRight size={16} aria-hidden="true" /></strong></Link>)}</div></div></section>

      <section className="section faq-section"><div className="shell"><SectionIntro eyebrow="High-intent questions" title="Start with a clearer understanding." body="Direct answers to the questions that shape an effective first conversation." /><div className="use-case-grid">{faqs.map((item) => <div key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></div>)}</div></div></section>

      <ContextualCTA title="What needs to move next?" body="Give us the context and the pressure behind it. We will bring the right people into the conversation." href="/contact?intent=technology_capability" label="Talk through the challenge" />
    </main>
  );
}
