"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function SiteLoader() {
  const [phase, setPhase] = useState<"loading" | "leaving" | "hidden">("loading");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const reducedTimer = window.setTimeout(() => setPhase("hidden"), 0);
      return () => window.clearTimeout(reducedTimer);
    }
    document.documentElement.classList.add("site-is-loading");
    const leaveTimer = window.setTimeout(() => setPhase("leaving"), 2100);
    const hideTimer = window.setTimeout(() => {
      setPhase("hidden");
      document.documentElement.classList.remove("site-is-loading");
    }, 2580);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
      document.documentElement.classList.remove("site-is-loading");
    };
  }, []);

  if (phase === "hidden") return null;
  return (
    <div className={`site-loader ${phase === "leaving" ? "is-leaving" : ""}`} role="status" aria-label="Loading Progience">
      <div className="loader-field" aria-hidden="true">
        <i /><i /><i /><i /><i /><i />
      </div>
      <div className="loader-stage">
        <div className="loader-stage-head" aria-hidden="true">
          <span>Technology capability partner</span>
          <span>00 / 03</span>
        </div>
        <div className="loader-logo">
          <Image src="/assets/brand/progience-logo-reversed.png" width={214} height={45} alt="" priority />
          <i aria-hidden="true" />
        </div>
        <div className="loader-steps" aria-hidden="true">
          <span><small>01</small><strong>Build.</strong></span>
          <i />
          <span><small>02</small><strong>Scale.</strong></span>
          <i />
          <span><small>03</small><strong>Evolve.</strong></span>
        </div>
        <div className="loader-progress" aria-hidden="true"><i /><b /></div>
        <p>Connecting people, engineering, quality and trust</p>
      </div>
      <div className="loader-edge loader-edge-top" aria-hidden="true"><i /><i /><i /></div>
      <div className="loader-edge loader-edge-bottom" aria-hidden="true"><i /><i /><i /></div>
    </div>
  );
}
