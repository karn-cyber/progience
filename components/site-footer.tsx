import Image from "next/image";
import Link from "next/link";
import { capabilities, solutions } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-top">
        <div className="footer-brand">
          <Image src="/assets/brand/progience-logo-reversed.png" alt="Progience" width={180} height={38} />
          <p>A Technology Capability Partner helping organisations build, scale and evolve the capability required to move forward.</p>
          <Link className="text-link light" href="/contact?intent=technology_capability">Start the right conversation <span aria-hidden="true">→</span></Link>
        </div>
        <div><h2>Solutions</h2>{solutions.map((item) => <Link key={item.slug} href={`/solutions/${item.slug}`}>{item.title}</Link>)}</div>
        <div><h2>Capabilities</h2>{capabilities.map((item) => <Link key={item.slug} href={`/capabilities/${item.slug}`}>{item.title.replace(" Services", "")}</Link>)}</div>
        <div><h2>Company</h2><Link href="/about">About</Link><Link href="/about/why-progience">Why Progience</Link><Link href="/about/enterprise-readiness">Enterprise readiness</Link><Link href="/insights">Insights</Link><Link href="/case-studies">Case studies</Link><Link href="/careers">Careers</Link></div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Progience Technologies. All rights reserved.</span>
        <div><Link href="/privacy">Privacy</Link><Link href="/cookie-policy">Cookies</Link><Link href="/terms">Terms</Link><Link href="/accessibility">Accessibility</Link><Link href="/security">Security</Link></div>
      </div>
    </footer>
  );
}
