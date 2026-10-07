"use client";

import { useEffect } from "react";

export function ScrollProgress() {
  useEffect(() => {
    const motionReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (motionReduced) {
      document.documentElement.style.setProperty("--scroll-progress", "0");
      return;
    }

    let rafId = 0;

    const update = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const clamped = Math.min(1, Math.max(0, progress));
      document.documentElement.style.setProperty("--scroll-progress", clamped.toFixed(4));
      rafId = 0;
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return null;
}
