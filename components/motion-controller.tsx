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
    const revealed = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).style.setProperty("--reveal-order", String(order.get(entry.target) ?? 0));
        entry.target.classList.add("is-visible");
        revealed.add(entry.target);
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

    // Observing elements too early can add is-visible / --reveal-order to a section
    // React hasn't finished hydrating (the App Router hydrates the layout before the
    // page segment, and hydration is concurrent) — a hydration mismatch. Defer setup
    // until after hydration; motion-ready stays immediate so the reveal-hidden state
    // applies without a content flash.
    let started = false;
    let raf = 0;
    const start = () => {
      if (started) return;
      started = true;
      register();
      mutationObserver.observe(document.body, { childList: true, subtree: true });
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    };
    // If the page loaded already scrolled (browser scroll restoration), the sections now
    // in view are the ones still hydrating — wait for full load so their hydration is done
    // before we reveal them. A fresh top-of-page load has no in-view below-fold sections,
    // so the fast path (next frame) is safe there.
    const scheduleStart = () => { raf = requestAnimationFrame(start); };
    if (window.scrollY > 4 && document.readyState !== "complete") {
      window.addEventListener("load", scheduleStart, { once: true });
    } else {
      scheduleStart();
    }
    // Fallback so a backgrounded tab (rAF paused) or a stalled load still wires up reveals.
    const timer = window.setTimeout(start, document.readyState === "complete" ? 80 : 2500);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      window.removeEventListener("load", scheduleStart);
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.documentElement.classList.remove("motion-ready", "page-scrolled");
      // Reset reveal state so a re-hydration (e.g. dev Fast Refresh) attaches to
      // clean DOM instead of tripping a mismatch on leftover is-visible / --reveal-order.
      revealed.forEach((el) => {
        el.classList.remove("is-visible");
        (el as HTMLElement).style.removeProperty("--reveal-order");
      });
    };
  }, []);

  return null;
}
