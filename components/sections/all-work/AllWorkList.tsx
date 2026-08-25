"use client";

import type { Project } from "@/data/projects";

type AllWorkListProps = {
  projects: Project[];
  canPreview: boolean;
  onPreviewChange: (project: Project | null) => void;
  onPointerMove: (point: { x: number; y: number }) => void;
};

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      className="archive-arrow size-5 shrink-0 text-teal-700 md:size-6"
      fill="none"
      viewBox="0 0 24 16"
    >
      <path
        d="M2 9.2c6.2-.8 11.4-.4 16.8.3M14.2 3.2c2.6 1.4 4.4 3.6 5.6 6.2-1.6 1.6-3.7 2.8-6.2 3.4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function AllWorkList({
  projects,
  canPreview,
  onPreviewChange,
  onPointerMove,
}: AllWorkListProps) {
  if (projects.length === 0) {
    return (
      <p className="font-sketch text-[1.35rem] text-teal-700">
        No projects in this category yet.
      </p>
    );
  }

  return (
    <ul key={projects.map((project) => project.id).join("-")} className="flex flex-col">
      {projects.map((project, index) => (
        <li
          key={project.id}
          className="archive-item"
          style={{ animationDelay: `${120 + index * 70}ms` }}
        >
          <a
            href={project.href}
            className="archive-row group grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 py-7 md:grid-cols-[4.5rem_minmax(0,1.1fr)_minmax(0,0.9fr)_auto] md:items-end md:gap-x-8 md:py-8"
            onMouseEnter={() => {
              if (canPreview) onPreviewChange(project);
            }}
            onMouseLeave={() => {
              if (canPreview) onPreviewChange(null);
            }}
            onMouseMove={(event) => {
              if (!canPreview) return;
              onPointerMove({ x: event.clientX, y: event.clientY });
            }}
          >
            <span className="font-sketch text-[1.25rem] leading-none text-teal-700 md:text-[1.4rem]">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="archive-title font-display wonk text-[clamp(1.7rem,3vw,2.55rem)] leading-[0.98] tracking-[-0.03em] text-teal-900">
                  {project.title}
                </h3>
                {project.featured ? (
                  <span className="font-sketch text-[1.05rem] text-teal-500">
                    featured
                  </span>
                ) : null}
              </div>
              <p className="mt-2 font-sketch text-[1.1rem] text-teal-700 md:text-[1.2rem]">
                {project.category} · {project.type}
              </p>
            </div>

            <div className="col-span-2 min-w-0 md:col-span-1">
              <p className="max-w-[34rem] text-[0.98rem] leading-relaxed text-teal-900/80 md:text-[1.02rem]">
                {project.description}
              </p>
              <p className="mt-3 text-[0.85rem] tracking-[0.04em] text-teal-700/90 uppercase">
                {project.technologies.join(" · ")}
              </p>
            </div>

            <span className="col-span-2 mt-1 inline-flex items-center gap-2 font-sketch text-[1.25rem] text-teal-900 md:col-span-1 md:mt-0 md:justify-self-end">
              View project
              <Arrow />
            </span>
          </a>

          <svg
            aria-hidden="true"
            className="h-3 w-full overflow-visible text-teal-900/25"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 1000 12"
          >
            <path
              d="M2 7c80-4 160 3 240-1 90-4 170 5 260 1 70-3 140 3 210 2 90-1 160 2 286 1"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.3"
            />
          </svg>
        </li>
      ))}
    </ul>
  );
}
