"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { capabilities, solutions } from "@/lib/content";

const menus = [
  { label: "Solutions", href: "/solutions", items: solutions.map(({ title, slug, need }) => ({ title, href: `/solutions/${slug}`, note: need })) },
  { label: "Capabilities", href: "/capabilities", items: capabilities.map(({ title, slug, role }) => ({ title, href: `/capabilities/${slug}`, note: role })) },
  { label: "Industries", href: "/industries", items: [
    { title: "Technology & Product", href: "/industries/technology-product", note: "Engineering, product and specialist capability" },
    { title: "Enterprise", href: "/industries/enterprise", note: "Complex technology, governance and reliability" },
  ] },
  { label: "Insights", href: "/insights", items: [
    { title: "Perspectives", href: "/insights", note: "High-intent questions and practical frameworks" },
    { title: "Case studies", href: "/case-studies", note: "Evidence-backed customer outcomes" },
  ] },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="shell header-inner">
        <Link href="/" aria-label="Progience home" className="brand-mark" onClick={() => setOpen(false)}>
          <Image src="/assets/brand/progience-logo-reversed.png" alt="Progience" width={190} height={40} priority unoptimized />
        </Link>

        <nav aria-label="Primary navigation" className="desktop-nav">
          {menus.map((menu) => (
            <div className="nav-group" key={menu.label}>
              <Link href={menu.href}>{menu.label}<ChevronDown size={14} aria-hidden="true" /></Link>
              <div className="mega-menu">
                <div className="mega-menu-title"><span>Explore</span><strong>{menu.label}</strong></div>
                <div className="mega-menu-grid">
                  {menu.items.map((item) => <Link href={item.href} key={item.href}><strong>{item.title}</strong><span>{item.note}</span></Link>)}
                </div>
              </div>
            </div>
          ))}
          <Link href="/gcc">GCC</Link>
          <Link href="/about">About</Link>
          <Link href="/careers">Careers</Link>
        </nav>

        <Link className="button button-primary header-cta" href="/contact?intent=technology_capability">Start a conversation</Link>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <nav id="mobile-menu" aria-label="Mobile navigation" className={`mobile-menu ${open ? "is-open" : ""}`}>
        {menus.map((menu) => (
          <div className="mobile-nav-group" key={menu.label}>
            <div><Link href={menu.href} onClick={() => setOpen(false)}>{menu.label}</Link><button type="button" aria-label={`Show ${menu.label} links`} aria-expanded={mobileSection === menu.label} onClick={() => setMobileSection(mobileSection === menu.label ? null : menu.label)}><ChevronDown size={18} /></button></div>
            {mobileSection === menu.label && <div className="mobile-submenu">{menu.items.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.title}</Link>)}</div>}
          </div>
        ))}
        <Link href="/gcc" onClick={() => setOpen(false)}>GCC</Link>
        <Link href="/about" onClick={() => setOpen(false)}>About</Link>
        <Link href="/careers" onClick={() => setOpen(false)}>Careers</Link>
        <Link className="button button-primary" href="/contact?intent=technology_capability" onClick={() => setOpen(false)}>Start a conversation</Link>
      </nav>
    </header>
  );
}
