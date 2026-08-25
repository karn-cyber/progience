"use client";

import { useEffect, useState } from "react";

const items = [
  { title: "Workforce", note: "Specialist people, ready for the work.", tone: "sky" },
  { title: "Engineering", note: "Products and platforms built with intent.", tone: "coral" },
  { title: "Quality", note: "Confidence built into delivery.", tone: "amber" },
  { title: "Digital Trust", note: "Security and resilience in the workflow.", tone: "sky" },
  { title: "App Support", note: "Critical applications kept steady.", tone: "coral" },
  { title: "Emerging Tech", note: "New technology made practical.", tone: "amber" },
];

export function CapabilityConsole() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % items.length), 2800);
    return () => window.clearInterval(timer);
  }, [paused]);

  const item = items[active];
  return (
    <section className={`capability-console console-tone-${item.tone}`} aria-label="Interactive Progience capability map" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}>
      <header className="console-header"><span>Capability map</span><strong><i /> Outcome led</strong></header>
      <div className="console-body">
        <div className="console-tabs" role="tablist" aria-label="Technology capabilities">
          {items.map((capability, index) => <button key={capability.title} type="button" role="tab" aria-selected={active === index} aria-controls="capability-panel" onClick={() => setActive(index)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{capability.title}</strong><i /></button>)}
        </div>
        <div className="console-detail" id="capability-panel" role="tabpanel" aria-live="polite" key={item.title}>
          <span>Selected capability</span>
          <strong>{item.title}</strong>
          <p>{item.note}</p>
          <div className="console-path" aria-hidden="true"><span>Challenge</span><i /><span>Capability</span><i /><span>Outcome</span></div>
        </div>
      </div>
      <footer className="console-footer"><span>{String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span><span>Choose a capability to explore</span></footer>
    </section>
  );
}
