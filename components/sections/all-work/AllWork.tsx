"use client";

import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import {
  archiveProjects,
  projectCategories,
  type FilterCategory,
} from "@/data/projects";
import { useSectionParallax } from "@/hooks/useSectionParallax";
import { AllWorkFilters } from "./AllWorkFilters";
import { AllWorkList } from "./AllWorkList";

export function AllWork() {
  const ref = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState<FilterCategory>("All");

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
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const counts = useMemo(() => {
    const next = {
      All: archiveProjects.length,
      Product: 0,
      AI: 0,
      Enterprise: 0,
    } satisfies Record<FilterCategory, number>;

    for (const project of archiveProjects) {
      next[project.category] += 1;
    }
    return next;
  }, []);

  const filtered = useMemo(() => {
    if (category === "All") return archiveProjects;
    return archiveProjects.filter((project) => project.category === category);
  }, [category]);

  const onFilter = (next: FilterCategory) => {
    startTransition(() => {
      setCategory(next);
    });
  };

  return (
    <section
      ref={ref}
      id="all-work"
      aria-labelledby="all-work-heading"
      className={`relative isolate overflow-x-clip ${ready ? "archive-ready" : ""} ${visible ? "is-visible" : ""}`}
    >
      <div
        aria-hidden="true"
        className="parallax-mid pointer-events-none absolute inset-0 z-0 overflow-hidden text-teal-900"
      >
        <svg
          className="absolute top-[10%] right-[6%] hidden h-28 w-36 text-teal-900/15 lg:block"
          fill="none"
          viewBox="0 0 140 100"
        >
          <path
            className="cred-ink"
            d="M18 22 H70 M18 22 V70"
            pathLength={1}
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <text
            x="78"
            y="40"
            fill="currentColor"
            style={{ fontFamily: "var(--font-reenie)", fontSize: "22px" }}
          >
            index
          </text>
        </svg>
      </div>

      <div className="relative z-10 sheet-block flex flex-col gap-8 md:gap-10">
        <header className="parallax-slow grid items-end gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="max-w-[40rem] lg:col-span-7">
            <p
              className="cred-write font-sketch -rotate-2 text-[1.75rem] leading-none text-teal-700 md:text-[1.95rem]"
              style={{ animationDelay: "60ms" }}
            >
              05 · all work
            </p>
            <h2
              id="all-work-heading"
              className="cred-write mt-3 -rotate-1 font-display text-[clamp(2.5rem,5.2vw,4.4rem)] leading-[0.9] text-teal-900"
              style={{ animationDelay: "160ms" }}
            >
              More work. More problems solved.
            </h2>
            <p
              className="cred-write mt-4 max-w-[28rem] rotate-1 font-sketch text-[1.65rem] leading-snug text-teal-700 md:text-[1.85rem]"
              style={{ animationDelay: "280ms" }}
            >
              a scrapbook wall — projects taped to the sheet
            </p>
          </div>

          <aside
            className="cred-write lg:col-span-5 lg:justify-self-end"
            style={{ animationDelay: "340ms" }}
          >
            <p className="font-sketch -rotate-1 text-[1.55rem] text-teal-700 md:text-[1.7rem]">
              pages in the binder
            </p>
            <p className="mt-2 font-display text-[clamp(3rem,6vw,4.5rem)] leading-none text-teal-900">
              {String(filtered.length).padStart(2, "0")}
              <span className="ml-2 font-sketch text-[1.6rem] text-teal-700">
                / {String(archiveProjects.length).padStart(2, "0")}
              </span>
            </p>
            <p className="mt-2 max-w-[14rem] font-sketch text-[1.35rem] leading-snug text-teal-700/75">
              {category === "All"
                ? "showing every stamp"
                : `showing ${category.toLowerCase()} only`}
            </p>
          </aside>
        </header>

        <div className="parallax-mid cred-write" style={{ animationDelay: "400ms" }}>
          <AllWorkFilters
            categories={projectCategories}
            active={category}
            onChange={onFilter}
            counts={counts}
          />
        </div>

        <div className="parallax-fast">
          <AllWorkList projects={filtered} />
        </div>

        <p
          className="parallax-slow cred-write max-w-[28rem] -rotate-1 font-sketch text-[1.55rem] leading-snug text-teal-700 md:text-[1.7rem]"
          style={{ animationDelay: "560ms" }}
        >
          click a stamp to open the full page
        </p>
      </div>
    </section>
  );
}
