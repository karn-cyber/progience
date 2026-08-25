"use client";

import { useEffect, useRef } from "react";

export function SiteCursor() {
  const dotRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    root.classList.add("cursor-enabled");
    let x = -40, y = -40, frame = 0;
    const paint = () => {
      frame = 0;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${x}px,${y}px,0)`;
    };
    const onMove = (event: PointerEvent) => {
      x = event.clientX; y = event.clientY;
      root.classList.add("cursor-visible");
      if (!frame) frame = window.requestAnimationFrame(paint);
    };
    const onOver = (event: PointerEvent) => root.classList.toggle("cursor-interactive", event.target instanceof Element && Boolean(event.target.closest("a,button,input,select,textarea,[role='tab']")));
    const onDown = () => root.classList.add("cursor-pressed");
    const onUp = () => root.classList.remove("cursor-pressed");
    const onLeave = () => root.classList.remove("cursor-visible");
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      root.classList.remove("cursor-enabled", "cursor-visible", "cursor-interactive", "cursor-pressed");
    };
  }, []);

  return <div className="site-cursor" aria-hidden="true"><span ref={ringRef} className="cursor-ring" /><span ref={dotRef} className="cursor-dot" /></div>;
}
