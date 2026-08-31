import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
import { capabilities, solutions } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-top">
        <div className="footer-brand">
          <Image src="/assets/brand/progience-logo-reversed.png" alt="Progience" width={180} height={38} />
          <p>A Technology Capability Partner helping organisations build, scale and evolve the capability required to move forward.</p>
          <Link className="text-link light" href="/contact?intent=technology_capability">Start the right conversation <span aria-hidden="true">→</span></Link>
          <address className="footer-contact">
            <a href="https://maps.google.com/?q=Krishe+Sapphire+Madhapur+Hyderabad" target="_blank" rel="noopener noreferrer">
              <MapPin size={16} aria-hidden="true" />
              <span>#103, Level 1, Krishe Block, Krishe Sapphire,<br />Madhapur, Hyderabad, Telangana 500081, India</span>
            </a>
            <a href="tel:+914046046713"><Phone size={16} aria-hidden="true" /><span>+91 40 4604 6713</span></a>
            <a href="mailto:info@progience.com"><Mail size={16} aria-hidden="true" /><span>info@progience.com</span></a>
          </address>
          <div className="footer-badges">
            <a className="footer-social" href="https://www.linkedin.com/company/progience-technologies/" target="_blank" rel="noopener noreferrer" aria-label="Progience on LinkedIn">
              <LinkedInIcon />
            </a>
            <a className="footer-duns" href="https://profiles.dunsregistered.com/TPIN-BAS-004.aspx" target="_blank" rel="noopener noreferrer">
              <ShieldCheck size={15} aria-hidden="true" />
              <span>D&#8209;U&#8209;N&#8209;S Registered</span>
            </a>
          </div>
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
