"use client";

import { useEffect, useRef, useState } from "react";
import type { FeaturedProject } from "@/data/featured-work";
import { ProjectVisual } from "./ProjectVisual";

function CtaArrow() {
  return (
    <svg
      aria-hidden="true"
      className="cta-arrow mt-1 size-5 shrink-0 md:size-6"
      fill="none"
      viewBox="0 0 24 16"
    >
      <path
        d="M2 9.2c6.2-.8 11.4-.4 16.8.3M14.2 3.2c2.6 1.4 4.4 3.6 5.6 6.2-1.6 1.6-3.7 2.8-6.2 3.4"
        pathLength={1}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

type FeaturedProjectItemProps = {
  project: FeaturedProject;
  total: number;
};

export function FeaturedProjectItem({ project, total }: FeaturedProjectItemProps) {
  const ref = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);

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
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const meta = `${project.type} · ${project.role}`;
  const stack = project.stack.join(" · ");

  if (project.layout === "primary") {
    return (
      <article
        ref={ref}
        className={`relative ${ready ? "project-ready" : ""} ${visible ? "is-visible" : ""}`}
        aria-labelledby={`project-${project.slug}-title`}
      >
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <ProjectVisual visual={project.visual} title={project.name} delay="100ms" />
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <ProjectCopy
              project={project}
              total={total}
              meta={meta}
              stack={stack}
              titleDelay="220ms"
              bodyDelay="360ms"
              ctaDelay="500ms"
            />
          </div>
        </div>
      </article>
    );
  }

  if (project.layout === "reverse") {
    return (
      <article
        ref={ref}
        className={`relative ${ready ? "project-ready" : ""} ${visible ? "is-visible" : ""}`}
        aria-labelledby={`project-${project.slug}-title`}
      >
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <ProjectCopy
              project={project}
              total={total}
              meta={meta}
              stack={stack}
              titleDelay="180ms"
              bodyDelay="320ms"
              ctaDelay="460ms"
            />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-7">
            <ProjectVisual visual={project.visual} title={project.name} delay="80ms" />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      ref={ref}
      className={`relative ${ready ? "project-ready" : ""} ${visible ? "is-visible" : ""}`}
      aria-labelledby={`project-${project.slug}-title`}
    >
      <div className="grid gap-8 pt-2 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <ProjectCopy
            project={project}
            total={total}
            meta={meta}
            stack={stack}
            titleDelay="160ms"
            bodyDelay="280ms"
            ctaDelay="400ms"
            compact
          />
        </div>
        <div className="lg:col-span-8">
          <ProjectVisual visual={project.visual} title={project.name} delay="100ms" />
        </div>
      </div>
    </article>
  );
}

function ProjectCopy({
  project,
  total,
  meta,
  stack,
  titleDelay,
  bodyDelay,
  ctaDelay,
  compact = false,
}: {
  project: FeaturedProject;
  total: number;
  meta: string;
  stack: string;
  titleDelay: string;
  bodyDelay: string;
  ctaDelay: string;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "max-w-[28rem]" : "max-w-[32rem]"}>
      <p
        className="cred-write font-sketch text-[1.15rem] text-teal-700 md:text-[1.3rem]"
        style={{ animationDelay: "80ms" }}
      >
        {project.number} / {String(total).padStart(2, "0")}
      </p>

      <h3
        id={`project-${project.slug}-title`}
        className={`cred-write mt-3 font-display wonk tracking-[-0.03em] text-teal-900 ${
          compact
            ? "text-[clamp(1.85rem,3vw,2.6rem)] leading-[0.98]"
            : "text-[clamp(2.1rem,4vw,3.4rem)] leading-[0.95]"
        }`}
        style={{ animationDelay: titleDelay }}
      >
        {project.name}
      </h3>

      <p
        className="cred-write mt-2 font-sketch text-[1.1rem] text-teal-700 md:text-[1.2rem]"
        style={{ animationDelay: titleDelay }}
      >
        {meta}
      </p>

      <p
        className="cred-write mt-5 text-[1.02rem] leading-relaxed text-teal-900/80 md:text-[1.08rem]"
        style={{ animationDelay: bodyDelay }}
      >
        {project.description}
      </p>

      <p
        className="cred-write mt-4 font-sketch text-[1.2rem] leading-snug text-teal-700 md:text-[1.35rem]"
        style={{ animationDelay: bodyDelay }}
      >
        {project.emphasis}
      </p>

      <p
        className="cred-write mt-5 text-[0.92rem] tracking-[0.04em] text-teal-700/90 uppercase"
        style={{ animationDelay: ctaDelay }}
      >
        {stack}
      </p>

      <div className="cred-write mt-7" style={{ animationDelay: ctaDelay }}>
        <a href={project.href} className="sketch-cta font-sketch text-[1.45rem] leading-none md:text-[1.6rem]">
          <span className="relative pb-1">Explore project</span>
          <CtaArrow />
        </a>
      </div>
    </div>
  );
}
