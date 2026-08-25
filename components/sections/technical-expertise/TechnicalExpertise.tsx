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
      className={`paper-hero relative isolate overflow-x-clip ${ready ? "expertise-ready" : ""} ${visible ? "is-visible" : ""}`}
    >
      <div className="paper-grain parallax-back opacity-[0.12]" />

      <div
        aria-hidden="true"
        className="parallax-mid pointer-events-none absolute inset-0 z-0 overflow-hidden text-teal-900"
      >
        <svg
          className="absolute top-[12%] right-[-8%] hidden h-[70%] w-[55%] text-teal-900/15 lg:block"
          fill="none"
          viewBox="0 0 600 700"
        >
          <circle cx="320" cy="300" r="220" stroke="currentColor" strokeDasharray="5 10" strokeWidth="0.8" />
          <path
            className="cred-ink"
            d="M80 120c90-20 160 40 230 20s140 50 200 30"
            pathLength={1}
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.2"
            style={{ animationDelay: "400ms" }}
          />
          <path d="M480 80 H540 M540 80 V140" stroke="currentColor" strokeWidth="1.1" />
          <path d="M90 560 H150 M90 560 V500" stroke="currentColor" strokeWidth="1.1" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[90rem] flex-col gap-12 px-[7vw] py-[clamp(4.5rem,12vh,8.5rem)] md:gap-14 lg:gap-16">
        <header className="parallax-slow max-w-[44rem]">
          <p
            className="cred-write font-sketch -rotate-1 text-[1.3rem] leading-none text-teal-700 md:text-[1.45rem]"
            style={{ animationDelay: "60ms" }}
          >
            08 · technical expertise
          </p>
          <h2
            id="expertise-heading"
            className="cred-write mt-5 font-display wonk text-[clamp(2.35rem,4.8vw,4rem)] leading-[0.95] tracking-[-0.03em] text-teal-900"
            style={{ animationDelay: "160ms" }}
          >
            The tools behind the work.
          </h2>
          <p
            className="cred-write mt-6 max-w-[36rem] text-[1.05rem] leading-relaxed text-teal-900/80 md:text-[1.1rem]"
            style={{ animationDelay: "280ms" }}
          >
            Technologies I use to design interfaces, build systems, connect
            services, work with data, and ship production software.
          </p>
          <p
            className="cred-write mt-5 max-w-[32rem] font-sketch text-[1.3rem] leading-snug text-teal-700 md:text-[1.45rem]"
            style={{ animationDelay: "360ms" }}
          >
            A broad stack, grounded in real engineering experience.
          </p>
        </header>

        <div className="parallax-mid cred-write" style={{ animationDelay: "400ms" }}>
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

        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="parallax-fast lg:col-span-7">
            <ExpertiseEcosystem
              technologies={expertiseTechnologies}
              categories={expertiseCategories}
              activeCategory={displayedCategory}
              activeTech={displayedTech}
              onHoverTech={setHoverTech}
              onSelectTech={setActiveTech}
            />
          </div>

          <aside className="parallax-slow lg:col-span-5 lg:pt-2">
            <ExpertiseFlow />

            <div
              className="cred-write mt-12 border-t border-teal-900/15 pt-8"
              style={{ animationDelay: "980ms" }}
            >
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-teal-500">
                Philosophy
              </p>
              <p className="mt-4 max-w-[28rem] font-display text-[1.35rem] leading-snug tracking-[-0.02em] text-teal-900 md:text-[1.5rem]">
                Technology is a means, not the product.
              </p>
              <p className="mt-4 max-w-[28rem] text-[1.02rem] leading-relaxed text-teal-900/75 md:text-[1.06rem]">
                Tools are chosen for the problem, the constraints, and the system
                around them — not collected for the sake of a list.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
