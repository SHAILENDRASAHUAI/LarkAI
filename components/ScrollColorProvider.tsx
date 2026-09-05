"use client";

import Lenis from "lenis";
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { interpolateDawnColor, interpolateTextColor } from "@/lib/color-interpolation";

type ScrollColorContextValue = {
  progress: number;
  reducedMotion: boolean;
  backgroundColor: string;
  textColor: string;
};

const ScrollColorContext = createContext<ScrollColorContextValue | null>(null);

export const useScrollColor = () => {
  const context = useContext(ScrollColorContext);
  if (!context) {
    throw new Error("useScrollColor must be used inside ScrollColorProvider");
  }
  return context;
};

export function ScrollColorProvider({ children }: PropsWithChildren) {
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotionPreference = () => {
      setReducedMotion(media.matches);
      document.documentElement.dataset.reducedMotion = media.matches ? "true" : "false";
    };

    applyMotionPreference();
    media.addEventListener("change", applyMotionPreference);

    const lenis = new Lenis({
      smoothWheel: !media.matches,
      lerp: media.matches ? 1 : 0.11,
    });

    const update = () => {
      const scrollTop = window.scrollY;
      const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
      const next = Math.min(1, Math.max(0, scrollTop / maxScroll));
      setProgress(next);
    };

    lenis.on("scroll", update);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    update();
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      media.removeEventListener("change", applyMotionPreference);
    };
  }, []);

  const value = useMemo(() => {
    const backgroundColor = interpolateDawnColor(progress);
    const textColor = interpolateTextColor(progress);
    return { progress, reducedMotion, backgroundColor, textColor };
  }, [progress, reducedMotion]);

  useEffect(() => {
    document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(4));
    document.documentElement.style.setProperty("--bg-current", value.backgroundColor);
    document.documentElement.style.setProperty("--text-current", value.textColor);
  }, [progress, value.backgroundColor, value.textColor]);

  return <ScrollColorContext.Provider value={value}>{children}</ScrollColorContext.Provider>;
}
