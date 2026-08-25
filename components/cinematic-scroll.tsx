"use client";

import { gsap } from "gsap";
import Lenis from "lenis";
import { useEffect } from "react";

export function CinematicScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let lenis: Lenis | undefined;
    let tick: ((time: number) => void) | undefined;

    if (!reducedMotion) {
      lenis = new Lenis({
        duration: 1.04,
        smoothWheel: true,
      });

      tick = (time) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    return () => {
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
    };
  }, []);

  return null;
}
