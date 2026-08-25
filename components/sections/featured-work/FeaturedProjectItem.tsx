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
  index: number;
};

export function FeaturedProjectItem({
  project,
  total,
  index,
}: FeaturedProjectItemProps) {
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

  // Alternate sides: even = visual left / copy right, odd = copy left / visual right
  const flip = index % 2 === 1;

  const meta = `${project.type} · ${project.role}`;
  const stack = project.stack.join(" · ");

  return (
    <article
      ref={ref}
      className={`relative ${ready ? "project-ready" : ""} ${visible ? "is-visible" : ""}`}
      aria-labelledby={`project-${project.slug}-title`}
    >
      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
        <div
          className={`lg:col-span-7 ${flip ? "order-1 lg:order-2" : "order-1"}`}
        >
          <ProjectVisual
            visual={project.visual}
            title={project.name}
            delay={flip ? "80ms" : "100ms"}
          />
        </div>

        <div
          className={`lg:col-span-5 ${flip ? "order-2 lg:order-1 lg:pr-2" : "order-2 lg:pb-1"}`}
        >
          <ProjectCopy
            project={project}
            total={total}
            meta={meta}
            stack={stack}
            tilt={flip ? "rotate-1" : "-rotate-1"}
            titleDelay={flip ? "180ms" : "220ms"}
            bodyDelay={flip ? "320ms" : "360ms"}
            ctaDelay={flip ? "460ms" : "500ms"}
          />
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
  tilt,
  titleDelay,
  bodyDelay,
  ctaDelay,
}: {
  project: FeaturedProject;
  total: number;
  meta: string;
  stack: string;
  tilt: string;
  titleDelay: string;
  bodyDelay: string;
  ctaDelay: string;
}) {
  return (
    <div className={`max-w-[32rem] ${tilt}`}>
      <p
        className="cred-write font-sketch text-[1.45rem] text-teal-700 md:text-[1.6rem]"
        style={{ animationDelay: "80ms" }}
      >
        {project.number} / {String(total).padStart(2, "0")}
      </p>

      <h3
        id={`project-${project.slug}-title`}
        className="cred-write mt-3 font-display text-[clamp(2.1rem,4vw,3.4rem)] leading-[0.95] text-teal-900"
        style={{ animationDelay: titleDelay }}
      >
        {project.name}
      </h3>

      <p
        className="cred-write mt-2 font-sketch text-[1.25rem] text-teal-700 md:text-[1.4rem]"
        style={{ animationDelay: titleDelay }}
      >
        {meta}
      </p>

      <p
        className="cred-write mt-5 text-[1.05rem] leading-snug text-teal-900/80 md:text-[1.1rem]"
        style={{ animationDelay: bodyDelay }}
      >
        {project.description}
      </p>

      <p
        className="cred-write mt-4 font-sketch text-[1.45rem] leading-snug text-teal-700 md:text-[1.6rem]"
        style={{ animationDelay: bodyDelay }}
      >
        {project.emphasis}
      </p>

      <p
        className="cred-write mt-5 font-sketch text-[1.2rem] text-teal-700/90 md:text-[1.3rem]"
        style={{ animationDelay: ctaDelay }}
      >
        {stack}
      </p>

      <div className="cred-write mt-7" style={{ animationDelay: ctaDelay }}>
        <a
          href={project.href}
          className="sketch-cta font-display text-[1.65rem] leading-none md:text-[1.85rem]"
        >
          <span className="relative pb-1">Explore project</span>
          <CtaArrow />
        </a>
      </div>
    </div>
  );
}
