"use client";

import { useEffect, useState } from "react";

export function SiteLoader() {
  const [phase, setPhase] = useState<"loading" | "leaving" | "hidden">("loading");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const reducedTimer = window.setTimeout(() => setPhase("hidden"), 0);
      return () => window.clearTimeout(reducedTimer);
    }
    document.documentElement.classList.add("site-is-loading");
    const leaveTimer = window.setTimeout(() => setPhase("leaving"), 1900);
    const hideTimer = window.setTimeout(() => {
      setPhase("hidden");
      document.documentElement.classList.remove("site-is-loading");
    }, 2380);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
      document.documentElement.classList.remove("site-is-loading");
    };
  }, []);

  if (phase === "hidden") return null;
  return (
    <div className={`site-loader ${phase === "leaving" ? "is-leaving" : ""}`} role="status" aria-label="Loading Progience">
      <div className="loader-mark" aria-hidden="true">
        <span className="loader-mark-fill" />
        <i />
      </div>
    </div>
  );
}
