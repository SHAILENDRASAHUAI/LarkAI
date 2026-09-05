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
    const evaluate = () => setShowDesktop3D(canUseDesktop3D());
    evaluate();

    const media = window.matchMedia("(min-width: 1024px)");
    media.addEventListener("change", evaluate);

    return () => media.removeEventListener("change", evaluate);
  }, []);

  if (!showDesktop3D) {
    return <StaticHeroArt />;
  }

  return <DesktopScene />;
}
