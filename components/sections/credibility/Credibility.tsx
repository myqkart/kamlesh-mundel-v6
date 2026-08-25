"use client";

import { useEffect, useRef, useState } from "react";
import { useSectionParallax } from "@/hooks/useSectionParallax";
import { CredibilityContent } from "./CredibilityContent";
import { CredibilityDecorations } from "./CredibilityDecorations";
import { CredibilityMetric } from "./CredibilityMetric";
import { CredibilityPipeline } from "./CredibilityPipeline";
import { CredibilityTech } from "./CredibilityTech";

export function Credibility() {
  const ref = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);

  useSectionParallax(ref);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    setReady(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.22, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="credibility"
      aria-labelledby="credibility-heading"
      className={`relative isolate overflow-hidden ${ready ? "cred-ready" : ""} ${visible ? "is-visible" : ""}`}
    >
      <div className="parallax-mid">
        <CredibilityDecorations />
      </div>
      <div className="relative z-10 sheet-block flex flex-col gap-9 md:gap-11">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0">
          <div className="parallax-slow lg:col-span-4">
            <CredibilityContent />
          </div>
          <div className="parallax-fast lg:col-span-8">
            <CredibilityMetric />
          </div>
        </div>

        <div className="parallax-mid">
          <CredibilityPipeline />
        </div>
        <div className="parallax-slow">
          <CredibilityTech />
        </div>
      </div>
    </section>
  );
}
