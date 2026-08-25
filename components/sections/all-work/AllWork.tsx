"use client";

import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import {
  archiveProjects,
  projectCategories,
  type FilterCategory,
  type Project,
} from "@/data/projects";
import { useSectionParallax } from "@/hooks/useSectionParallax";
import { AllWorkFilters } from "./AllWorkFilters";
import { AllWorkList } from "./AllWorkList";
import { ArchivePreview } from "./ArchivePreview";

export function AllWork() {
  const ref = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState<FilterCategory>("All");
  const [preview, setPreview] = useState<Project | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [canPreview, setCanPreview] = useState(false);

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

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanPreview(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const filtered = useMemo(() => {
    if (category === "All") return archiveProjects;
    return archiveProjects.filter((project) => project.category === category);
  }, [category]);

  const onFilter = (next: FilterCategory) => {
    startTransition(() => {
      setCategory(next);
      setPreview(null);
    });
  };

  return (
    <section
      ref={ref}
      id="all-work"
      aria-labelledby="all-work-heading"
      className={`paper-hero relative isolate overflow-hidden ${ready ? "archive-ready" : ""} ${visible ? "is-visible" : ""}`}
    >
      <div className="paper-grain parallax-back opacity-[0.12]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[90rem] flex-col gap-12 px-[7vw] py-[clamp(4.5rem,12vh,8.5rem)] md:gap-14 lg:gap-16">
        <header className="parallax-slow max-w-[42rem]">
          <p
            className="cred-write font-sketch -rotate-1 text-[1.3rem] leading-none text-teal-700 md:text-[1.45rem]"
            style={{ animationDelay: "60ms" }}
          >
            05 · all work
          </p>
          <h2
            id="all-work-heading"
            className="cred-write mt-5 font-display wonk text-[clamp(2.35rem,4.8vw,4rem)] leading-[0.95] tracking-[-0.03em] text-teal-900"
            style={{ animationDelay: "160ms" }}
          >
            More work. More problems solved.
          </h2>
          <p
            className="cred-write mt-6 max-w-[34rem] text-[1.05rem] leading-relaxed text-teal-900/80 md:text-[1.1rem]"
            style={{ animationDelay: "280ms" }}
          >
            A broader collection of products, systems, experiments, and
            engineering explorations.
          </p>
        </header>

        <div className="parallax-mid cred-write" style={{ animationDelay: "380ms" }}>
          <AllWorkFilters
            categories={projectCategories}
            active={category}
            onChange={onFilter}
          />
        </div>

        <div className="parallax-fast">
          <AllWorkList
            projects={filtered}
            canPreview={canPreview}
            onPreviewChange={setPreview}
            onPointerMove={setPointer}
          />
        </div>
      </div>

      {canPreview ? (
        <ArchivePreview project={preview} x={pointer.x} y={pointer.y} />
      ) : null}
    </section>
  );
}
