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
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      <HeroDecorations />
      <div className="parallax-mid pointer-events-none absolute inset-3 z-[1] md:inset-5">
        <svg
          aria-hidden="true"
          className="size-full text-teal-900/30"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <path
            className="ink-draw"
            d="M2.8 4.2 C 30 1.8, 68 2.6, 96.8 3.4 C 98.2 24, 98.4 70, 96.4 96.4 C 62 97.8, 32 97.2, 3.2 95.6 C 1.6 68, 1.8 26, 2.8 4.2 Z"
            pathLength={1}
            stroke="currentColor"
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
      <div className="relative z-10 flex min-h-[100svh] flex-1 flex-col justify-between gap-6 px-[max(1.85rem,6.5vw)] pb-[max(var(--section-pad-y),env(safe-area-inset-bottom))] pt-[max(2.75rem,env(safe-area-inset-top),6vh)] md:gap-0 md:px-[7vw] md:pb-[var(--section-pad-y)] md:pt-[max(3.5rem,8vh)]">
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
