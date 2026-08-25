"use client";

import type { Project } from "@/data/projects";

type AllWorkListProps = {
  projects: Project[];
};

const TILTS = [
  "-rotate-1",
  "rotate-1",
  "rotate-2",
  "-rotate-2",
  "rotate-1",
  "-rotate-1",
] as const;

export function AllWorkList({ projects }: AllWorkListProps) {
  if (projects.length === 0) {
    return (
      <p className="font-sketch text-[1.7rem] text-teal-700">
        nothing taped here yet — try another tab
      </p>
    );
  }

  return (
    <ul
      key={projects.map((project) => project.id).join("-")}
      className="archive-wall grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-7 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12"
    >
      {projects.map((project, index) => {
        const tilt = TILTS[index % TILTS.length]!;

        return (
          <li
            key={project.id}
            className="archive-item"
            style={{ animationDelay: `${100 + index * 90}ms` }}
          >
            <a href={project.href} className={`archive-stamp group ${tilt}`}>
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 size-full text-teal-900/35"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <path
                  d="M4 6 C 28 2.5, 70 3, 95 6.5 C 97.5 30, 97 68, 94 93 C 68 96.5, 30 96, 5.5 92 C 2.5 66, 2.8 32, 4 6 Z"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* Tape / pin marks */}
              <span
                aria-hidden="true"
                className="archive-pin absolute -top-2 left-1/2 z-[1] h-3 w-10 -translate-x-1/2 rotate-[-4deg] bg-teal-300/55"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-3 right-4 font-sketch text-[1.35rem] leading-none text-teal-700/55"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="relative z-[1] flex h-full flex-col px-5 pt-7 pb-5 md:px-6 md:pt-8 md:pb-6">
                <StampDoodle category={project.category} visual={project.visual} />

                <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="font-sketch text-[1.35rem] text-teal-700 md:text-[1.45rem]">
                    {project.category}
                  </span>
                  <span className="text-teal-500">·</span>
                  <span className="font-sketch text-[1.25rem] text-teal-700/75 md:text-[1.35rem]">
                    {project.type}
                  </span>
                  {project.featured ? (
                    <span className="ml-1 font-sketch text-[1.2rem] text-teal-500">
                      ★ featured
                    </span>
                  ) : null}
                </div>

                <h3 className="archive-title mt-2 font-display text-[clamp(1.65rem,2.8vw,2.2rem)] leading-[0.95] text-teal-900">
                  {project.title}
                </h3>

                <p className="mt-3 flex-1 text-[0.98rem] leading-snug text-teal-900/75 md:text-[1.02rem]">
                  {project.emphasis}
                </p>

                <div className="mt-4 flex flex-wrap gap-x-2.5 gap-y-1">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="font-sketch text-[1.2rem] text-teal-700/80 md:text-[1.3rem]"
                    >
                      [{tech}]
                    </span>
                  ))}
                </div>

                <span className="mt-5 inline-flex items-center gap-2 font-sketch text-[1.45rem] text-teal-900 md:text-[1.55rem]">
                  let&apos;s talk
                  <svg
                    aria-hidden="true"
                    className="archive-arrow size-5 shrink-0 text-teal-700"
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
                </span>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function StampDoodle({
  category,
  visual,
}: {
  category: Project["category"];
  visual?: Project["visual"];
}) {
  const kind = visual ?? (category === "AI" ? "extract" : category === "Enterprise" ? "erp" : "vault");

  return (
    <div aria-hidden="true" className="archive-stamp-doodle text-teal-900">
      {kind === "vault" ? <DoodleVault /> : null}
      {kind === "extract" ? <DoodleExtract /> : null}
      {kind === "erp" ? <DoodleErp /> : null}
    </div>
  );
}

function DoodleVault() {
  return (
    <svg className="h-16 w-full max-w-[11rem]" fill="none" viewBox="0 0 180 70">
      <g stroke="currentColor" strokeLinecap="round">
        <path
          className="cred-ink"
          d="M20 18 H110 V58 H20 Z"
          pathLength={1}
          strokeWidth="1.6"
        />
        <circle cx="65" cy="38" r="10" strokeWidth="1.5" />
        <path d="M65 38 H78" strokeWidth="1.3" />
        <path
          className="cred-ink"
          d="M125 28c12-8 28-6 36 6"
          pathLength={1}
          strokeWidth="1.4"
          style={{ animationDelay: "200ms" }}
        />
        <text
          x="122"
          y="52"
          fill="currentColor"
          style={{ fontFamily: "var(--font-reenie)", fontSize: "18px" }}
        >
          lock
        </text>
      </g>
    </svg>
  );
}

function DoodleExtract() {
  return (
    <svg className="h-16 w-full max-w-[11rem]" fill="none" viewBox="0 0 180 70">
      <g stroke="currentColor" strokeLinecap="round">
        <path
          className="cred-ink"
          d="M18 14 H70 V58 H18 Z"
          pathLength={1}
          strokeWidth="1.55"
        />
        <path d="M28 26 H58 M28 36 H52 M28 46 H60" strokeWidth="1.15" strokeOpacity="0.45" />
        <path
          className="cred-ink"
          d="M78 36 H112"
          pathLength={1}
          strokeWidth="1.5"
          style={{ animationDelay: "160ms" }}
        />
        <path d="M104 28l10 8-10 8" strokeWidth="1.4" />
        <path
          className="cred-ink"
          d="M120 18 H162 V54 H120 Z"
          pathLength={1}
          strokeWidth="1.55"
          style={{ animationDelay: "280ms" }}
        />
        <circle cx="132" cy="30" r="3" fill="var(--color-teal-300)" strokeWidth="1.1" />
        <circle cx="148" cy="30" r="3" strokeWidth="1.1" />
        <circle cx="132" cy="44" r="3" strokeWidth="1.1" />
        <circle cx="148" cy="44" r="3" fill="var(--color-teal-300)" strokeWidth="1.1" />
      </g>
    </svg>
  );
}

function DoodleErp() {
  return (
    <svg className="h-16 w-full max-w-[11rem]" fill="none" viewBox="0 0 180 70">
      <g stroke="currentColor" strokeLinecap="round">
        <path
          className="cred-ink"
          d="M22 48 H55 V22 H22 Z"
          pathLength={1}
          strokeWidth="1.5"
        />
        <path
          className="cred-ink"
          d="M70 48 H105 V14 H70 Z"
          pathLength={1}
          strokeWidth="1.55"
          style={{ animationDelay: "120ms" }}
        />
        <path
          className="cred-ink"
          d="M120 48 H160 V28 H120 Z"
          pathLength={1}
          strokeWidth="1.5"
          style={{ animationDelay: "220ms" }}
        />
        <path
          d="M55 35 H70 M105 30 H120"
          strokeWidth="1.3"
          strokeOpacity="0.55"
        />
        <path d="M18 52 H168" strokeWidth="1.1" strokeOpacity="0.35" />
      </g>
    </svg>
  );
}
