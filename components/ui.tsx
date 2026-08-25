import Link from "next/link";
import { ArrowRight, Check, Network, ShieldCheck } from "lucide-react";

export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  const trail = [{ label: "Home", href: "/" }, ...items];
  const structured = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: trail.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.label, ...(item.href ? { item: `https://progience.com${item.href === "/" ? "" : item.href}` } : {}) })) };
  return <><nav aria-label="Breadcrumb" className="breadcrumbs"><ol>{trail.map((item, index) => <li key={`${item.label}-${index}`}>{item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</li>)}</ol></nav><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }} /></>;
}

export function PageHero({ eyebrow, title, intro, crumbs, actions }: { eyebrow: string; title: string; intro: string; crumbs?: Array<{ label: string; href?: string }>; actions?: React.ReactNode }) {
  return <section className="page-hero"><div className="shell">{crumbs && <Breadcrumbs items={crumbs} />}<p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="page-hero-intro">{intro}</p>{actions && <div className="hero-actions">{actions}</div>}</div></section>;
}

export function SectionIntro({ eyebrow, title, body, align = "left" }: { eyebrow?: string; title: string; body?: string; align?: "left" | "center" }) {
  return <div className={`section-intro ${align === "center" ? "center" : ""}`}>{eyebrow && <p className="eyebrow dark">{eyebrow}</p>}<h2>{title}</h2>{body && <p>{body}</p>}</div>;
}

export function OutcomeList({ items }: { items: string[] }) {
  return <ul className="outcome-list">{items.map((item) => <li key={item}><Check size={18} aria-hidden="true" />{item}</li>)}</ul>;
}

export function ContextualCTA({ eyebrow = "The next step", title, body, href, label }: { eyebrow?: string; title: string; body: string; href: string; label: string }) {
  return <section className="cta-band"><div className="shell cta-grid"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p>{body}</p></div><Link className="button button-primary" href={href}>{label}<ArrowRight size={17} aria-hidden="true" /></Link></div></section>;
}

export function ProofStandard() {
  return <div className="proof-standard"><ShieldCheck aria-hidden="true" /><div><span>Evidence before assertion</span><h3>Proof is published only when it has a clear source, owner and approval path.</h3><p>Capabilities, outcomes, credentials and customer evidence remain qualified until validation is complete.</p><Link className="text-link" href="/case-studies">See our proof standard <span aria-hidden="true">→</span></Link></div></div>;
}

export function ConnectedSystem({ compact = false }: { compact?: boolean }) {
  const nodes = ["Workforce", "Engineering", "Quality", "Digital Trust", "App Support", "Emerging Tech"];
  return <div className={`connected-system ${compact ? "compact" : ""}`}><div className="system-center"><Network aria-hidden="true" /><small>Customer outcome</small><strong>Connected capability</strong></div>{nodes.map((node, index) => <span key={node} className={`system-node system-node-${index + 1}`}>{node}</span>)}</div>;
}
