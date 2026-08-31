"use client";

import { useEffect } from "react";

const revealSelector = [
  ".section",
  ".section-intro",
  ".tension-inner > *",
  ".solution-card",
  ".capability-card-grid > a",
  ".insight-grid > a",
  ".audience-grid > a",
  ".industry-grid > a",
  ".reason-card-grid > div",
  ".response-points > div",
  ".reason-grid > div",
  ".process-grid > div",
  ".dark-card-grid > a",
  ".use-case-grid > div",
  ".engagement-flow > div",
  ".comparison-flow > div",
  ".lifecycle-grid > div",
  ".mapping-table > div",
  ".article-body > section",
  ".framework-list > li",
  ".proof-standard",
  ".outcome-panel",
  ".outcome-list > li",
  ".capability-tags > *",
  ".note-panel",
  ".contact-form",
  ".contact-aside",
  ".connected-system",
  ".cta-grid",
  ".footer-top > div",
  ".footer-bottom",
].join(",");

export function MotionController() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("motion-ready");
    const seen = new WeakSet<Element>();
    const order = new WeakMap<Element, number>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).style.setProperty("--reveal-order", String(order.get(entry.target) ?? 0));
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -8%", threshold: 0.12 });

    const register = () => {
      document.querySelectorAll(revealSelector).forEach((element, index) => {
        if (seen.has(element)) return;
        seen.add(element);
        order.set(element, index % 4);
        observer.observe(element);
      });
    };

    const onScroll = () => document.documentElement.classList.toggle("page-scrolled", window.scrollY > 24);
    const mutationObserver = new MutationObserver(register);

    // In the App Router the layout hydrates before the page segment, so observing
    // elements immediately can add is-visible / --reveal-order to a section that
    // React hasn't hydrated yet — a hydration mismatch. Defer observation until
    // after hydration. rAF covers the visible case (fires after paint); a timeout
    // fallback covers a backgrounded tab, where rAF is paused and would otherwise
    // never reveal the content. motion-ready stays immediate so the reveal-hidden
    // state is applied without a content flash.
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      register();
      mutationObserver.observe(document.body, { childList: true, subtree: true });
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    };
    const raf = requestAnimationFrame(start);
    const timer = window.setTimeout(start, 80);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.documentElement.classList.remove("motion-ready", "page-scrolled");
    };
  }, []);

  return null;
}
