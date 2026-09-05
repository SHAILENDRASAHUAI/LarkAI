"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DesktopScene = dynamic(() => import("./Hero3DScene"), {
  ssr: false,
  loading: () => <StaticHeroArt />,
});

function canUseDesktop3D() {
  if (typeof window === "undefined") {
    return false;
  }

  const desktopViewport = window.matchMedia("(min-width: 1024px)").matches;

  if (!desktopViewport) {
    return false;
  }

  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

function deferDesktopSceneLoad(callback: () => void) {
  if ("requestIdleCallback" in window) {
    const idleId = window.requestIdleCallback(callback, { timeout: 1600 });
    return () => window.cancelIdleCallback(idleId);
  }

  const timeoutId = setTimeout(callback, 900);
  return () => clearTimeout(timeoutId);
}

export function StaticHeroArt() {
  return (
    <div className="hero-fallback" aria-hidden="true">
      <div className="hero-fallback-core" />
    </div>
  );
}

export function HeroVisual() {
  const [showDesktop3D, setShowDesktop3D] = useState(false);

  useEffect(() => {
    let cleanupLoad = () => {};

    const evaluate = () => {
      if (!canUseDesktop3D()) {
        cleanupLoad();
        setShowDesktop3D(false);
        return;
      }

      cleanupLoad();
      cleanupLoad = deferDesktopSceneLoad(() => setShowDesktop3D(true));
    };

    evaluate();

    const media = window.matchMedia("(min-width: 1024px)");
    media.addEventListener("change", evaluate);

    return () => {
      cleanupLoad();
      media.removeEventListener("change", evaluate);
    };
  }, []);

  if (!showDesktop3D) {
    return <StaticHeroArt />;
  }

  return <DesktopScene />;
}
