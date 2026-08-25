"use client";

import { useEffect, useRef, useState } from "react";
import {
  expertiseCategories,
  expertiseTechnologies,
  type ExpertiseCategoryId,
} from "@/data/technical-expertise";
import { useSectionParallax } from "@/hooks/useSectionParallax";
import { ExpertiseCategories } from "./ExpertiseCategories";
import { ExpertiseEcosystem } from "./ExpertiseEcosystem";
import { ExpertiseFlow } from "./ExpertiseFlow";

export function TechnicalExpertise() {
  const ref = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState<ExpertiseCategoryId | "all">("all");
  const [hoverCategory, setHoverCategory] = useState<
    ExpertiseCategoryId | "all" | null
  >(null);
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const [hoverTech, setHoverTech] = useState<string | null>(null);

  useSectionParallax(ref);

  const displayedCategory = hoverCategory ?? category;
  const displayedTech = hoverTech ?? activeTech;

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
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="expertise"
      aria-labelledby="expertise-heading"
      className={`relative isolate overflow-x-clip ${ready ? "expertise-ready" : ""} ${visible ? "is-visible" : ""}`}
    >
      <div className="relative z-10 sheet-block flex flex-col gap-8 md:gap-10">
        {/* Split header: title left, philosophy scribble right — not a content column */}
        <header className="parallax-slow grid items-end gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="max-w-[40rem] lg:col-span-7">
            <p
              className="cred-write font-sketch -rotate-2 text-[1.75rem] leading-none text-teal-700 md:text-[1.95rem]"
              style={{ animationDelay: "60ms" }}
            >
              08 · technical expertise
            </p>
            <h2
              id="expertise-heading"
              className="cred-write mt-3 -rotate-1 font-display text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.9] text-teal-900"
              style={{ animationDelay: "160ms" }}
            >
              The tools behind the work.
            </h2>
            <p
              className="cred-write mt-4 max-w-[30rem] text-[1.12rem] leading-snug text-teal-900/75 md:text-[1.2rem]"
              style={{ animationDelay: "280ms" }}
            >
              Interfaces, systems, data, services — one stack, chosen for the
              problem.
            </p>
          </div>

          <aside
            className="cred-write relative max-w-[22rem] lg:col-span-5 lg:justify-self-end"
            style={{ animationDelay: "340ms" }}
          >
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute -inset-3 text-teal-900/20"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <path
                d="M8 18 C 30 6, 70 8, 92 16 C 96 40, 94 70, 88 88 C 60 96, 28 94, 10 84 C 4 58, 4 36, 8 18 Z"
                stroke="currentColor"
                strokeWidth="1.3"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <p className="relative rotate-2 font-sketch text-[1.55rem] leading-none text-teal-700 md:text-[1.7rem]">
              margin note
            </p>
            <p className="relative mt-3 -rotate-1 font-display text-[1.55rem] leading-snug text-teal-900 md:text-[1.75rem]">
              Technology is a means, not the product.
            </p>
            <p className="relative mt-3 text-[1.05rem] leading-snug text-teal-900/70">
              Chosen for constraints — not collected for a list.
            </p>
          </aside>
        </header>

        {/* Horizontal connection ribbon — unique to expertise */}
        <div className="parallax-mid cred-write" style={{ animationDelay: "400ms" }}>
          <ExpertiseFlow />
        </div>

        <div className="parallax-fast cred-write" style={{ animationDelay: "480ms" }}>
          <ExpertiseCategories
            categories={expertiseCategories}
            active={displayedCategory}
            onChange={(next) => {
              setCategory(next);
              setActiveTech(null);
            }}
            onHover={setHoverCategory}
          />
        </div>

        {/* Full-bleed constellation — no right sidebar */}
        <div className="parallax-slow">
          <ExpertiseEcosystem
            technologies={expertiseTechnologies}
            categories={expertiseCategories}
            activeCategory={displayedCategory}
            activeTech={displayedTech}
            onHoverTech={setHoverTech}
            onSelectTech={setActiveTech}
          />
        </div>
      </div>
    </section>
  );
}
