"use client";

import { useRef } from "react";
import { useSectionParallax } from "@/hooks/useSectionParallax";
import { HeroContent } from "./HeroContent";
import { HeroDecorations } from "./HeroDecorations";
import { HeroMetadata } from "./HeroMetadata";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  useSectionParallax(ref);

  return (
    <section
      ref={ref}
      id="top"
      aria-label="Introduction"
      className="paper-hero relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      <HeroDecorations />
      <div className="parallax-mid pointer-events-none absolute inset-3 z-[1] md:inset-4">
        <svg
          aria-hidden="true"
          className="size-full text-teal-900/35"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <path
            className="ink-draw"
            d="M2.2 3.4 C 28 1.6, 71 2.2, 97.4 2.8 C 98.6 22, 98.8 68, 97.1 97.2 C 64 98.6, 29 98.2, 2.6 96.8 C 1.2 70, 1.4 24, 2.2 3.4 Z"
            pathLength={1}
            stroke="currentColor"
            strokeWidth="1.15"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
      <div className="paper-grain parallax-back" />
      <div className="relative z-10 flex min-h-[100svh] flex-1 flex-col justify-between px-[7vw] pb-8 pt-[max(4.5rem,11vh)] md:pb-10">
        <div className="parallax-slow">
          <HeroContent />
        </div>
        <div className="parallax-fast">
          <HeroMetadata />
        </div>
      </div>
    </section>
  );
}
