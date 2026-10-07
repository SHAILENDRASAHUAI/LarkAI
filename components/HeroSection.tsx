"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useScrollColor } from "./ScrollColorProvider";
import { detectDeviceTier, type DeviceTier } from "@/lib/device-tier";

const HeroScene3D = dynamic(() => import("./HeroScene3D"), {
  ssr: false,
  loading: () => <div className="hero-canvas-placeholder" aria-hidden="true" />,
});

function MobileBirdFallback() {
  return (
    <div className="mobile-bird-shell" aria-hidden="true">
      <svg viewBox="0 0 400 220" className="mobile-bird-svg">
        <path
          d="M21 130c39-37 91-60 143-58 21-26 53-38 92-29 26 6 58 29 72 52-24-12-47-18-68-12 15 11 29 27 43 48-31-12-62-15-92-8-29 7-52 20-71 36-36-10-73-20-119-29z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

export function HeroSection() {
  const { progress, reducedMotion } = useScrollColor();
  const [tier, setTier] = useState<DeviceTier>("low");

  useEffect(() => {
    let mounted = true;
    detectDeviceTier().then((nextTier) => {
      if (mounted) setTier(nextTier);
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="top" className="hero section-pad-lg">
      <div className="container hero-layout">
        <div className="hero-media" aria-hidden="true">
          {tier === "low" || reducedMotion ? (
            <MobileBirdFallback />
          ) : (
            <HeroScene3D
              progress={progress}
              particleCount={tier === "high" ? 6000 : 2500}
              flatShader={tier === "mid"}
              cursorParallax={tier === "high"}
            />
          )}
        </div>

        <div className="hero-copy">
          <h1>Say the right thing, even when your mind goes blank.</h1>
          <p>
            LarkAI listens during your live interview and quietly suggests answers grounded in your
            resume — visible only to you.
          </p>
          <div className="hero-actions">
            <a className="cta-button" href="#final-cta">
              Try LarkAI
            </a>
            <a className="secondary-link" href="#how-it-works">
              See how it works
            </a>
          </div>
          <span className="trust-line">No credit card required to start.</span>
        </div>
      </div>
    </section>
  );
}
