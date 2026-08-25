"use client";

import type { ExperienceRole } from "@/data/experience";

type ExperienceChapterProps = {
  role: ExperienceRole;
  index: number;
  total: number;
  active: boolean;
  onActivate: (id: string) => void;
};

/** One stop on the career journey — page + doodle, alternating sides. */
export function ExperienceChapter({
  role,
  index,
  total,
  active,
  onActivate,
}: ExperienceChapterProps) {
  const flip = index % 2 === 1;

  return (
    <article
      data-experience-role={role.id}
      className={`experience-chapter cred-write ${role.current ? "is-current" : ""} ${active ? "is-active" : ""}`}
      style={{ animationDelay: `${320 + index * 160}ms` }}
      onMouseEnter={() => onActivate(role.id)}
      onFocusCapture={() => onActivate(role.id)}
    >
      {/* Path connector into this chapter */}
      {index > 0 ? (
        <svg
          aria-hidden="true"
          className="experience-path-link pointer-events-none absolute -top-12 left-1/2 h-12 w-16 -translate-x-1/2 text-teal-900/40 md:-top-14 md:h-14"
          fill="none"
          viewBox="0 0 64 56"
        >
          <path
            className="experience-line"
            d={
              flip
                ? "M32 4c-10 12-8 24 0 36c6 8 4 12 0 16"
                : "M32 4c10 12 8 24 0 36c-6 8-4 12 0 16"
            }
            pathLength={1}
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.6"
            style={{ animationDelay: `${280 + index * 160}ms` }}
          />
          <circle cx="32" cy="48" r="3.5" fill="var(--color-teal-300)" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      ) : null}

      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Story */}
        <div
          className={`relative ${flip ? "lg:order-2 lg:col-span-6" : "lg:col-span-6"}`}
        >
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span
              className={`font-sketch text-[1.7rem] leading-none text-teal-700 md:text-[1.9rem] ${
                flip ? "rotate-2" : "-rotate-2"
              }`}
            >
              ch. {role.number}
            </span>
            <span className="font-sketch text-[1.45rem] text-teal-700/75 md:text-[1.6rem]">
              {role.start} → {role.end}
            </span>
            {role.current ? (
              <span className="experience-now font-sketch text-[1.4rem] text-teal-700">
                you are here
              </span>
            ) : null}
          </div>

          <p
            className={`mt-3 font-sketch text-[1.45rem] text-teal-700/80 md:text-[1.6rem] ${
              flip ? "-rotate-1" : "rotate-1"
            }`}
          >
            {role.domain}
          </p>

          <h3
            className={`mt-2 font-display leading-[0.92] text-teal-900 ${
              flip ? "rotate-1" : "-rotate-1"
            } ${
              role.current
                ? "text-[clamp(2.1rem,4.4vw,3.5rem)]"
                : "text-[clamp(1.75rem,3.4vw,2.75rem)]"
            }`}
          >
            {role.company}
          </h3>

          <p className="mt-2 font-display text-[clamp(1.2rem,2vw,1.55rem)] text-teal-700">
            {role.title}
          </p>

          <p className="mt-1 font-sketch text-[1.25rem] text-teal-700/70">
            {role.location}
          </p>

          <p className="mt-5 max-w-[32rem] text-[1.08rem] leading-snug text-teal-900/78 md:text-[1.14rem]">
            {role.scope}
          </p>

          <ul className="mt-5 max-w-[32rem] space-y-2">
            {role.responsibilities.slice(0, role.current ? 4 : 3).map((item) => (
              <li
                key={item}
                className="experience-point text-[0.98rem] leading-snug text-teal-900/75 md:text-[1.02rem]"
              >
                {item}
              </li>
            ))}
          </ul>

          {role.impact ? (
            <p
              className={`mt-5 max-w-[30rem] font-sketch text-[1.55rem] leading-snug text-teal-700 md:text-[1.7rem] ${
                flip ? "rotate-1" : "-rotate-1"
              }`}
            >
              {role.impact}
            </p>
          ) : null}

          {role.note ? (
            <p className="mt-4 max-w-[28rem] rotate-1 font-sketch text-[1.35rem] text-teal-500">
              ★ {role.note}
            </p>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
            {role.focus.map((tag) => (
              <span
                key={tag}
                className="font-sketch text-[1.3rem] text-teal-700/85 md:text-[1.4rem]"
              >
                [{tag}]
              </span>
            ))}
          </div>
        </div>

        {/* Chapter doodle plate */}
        <div
          className={`relative ${flip ? "lg:order-1 lg:col-span-6" : "lg:col-span-6"}`}
        >
          <div
            className={`experience-doodle-plate relative mx-auto aspect-[5/4] w-full max-w-[28rem] overflow-hidden lg:max-w-none ${
              flip ? "-rotate-1" : "rotate-1"
            } ${active ? "is-active" : ""}`}
          >
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 size-full text-teal-900/40"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <path
                d="M3 5 C 26 2, 72 2.5, 96 5 C 98 28, 98 70, 95 94 C 70 97, 28 96, 4 93 C 2 66, 2 30, 3 5 Z"
                stroke="currentColor"
                strokeWidth="1.2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <div className="absolute inset-[6%]">
              <ChapterDoodle roleId={role.id} active={active} />
            </div>

            <p className="absolute top-4 left-5 font-sketch text-[1.35rem] text-teal-700/70">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function ChapterDoodle({ roleId, active }: { roleId: string; active: boolean }) {
  return (
    <div
      className={`experience-chapter-doodle size-full ${active ? "is-active" : ""}`}
      aria-hidden="true"
    >
      {roleId === "momentum91" ? <DoodleEnterprise /> : null}
      {roleId === "techuz-fullstack" ? <DoodleProduct /> : null}
      {roleId === "techuz-trainee" ? <DoodleFoundation /> : null}
    </div>
  );
}

function DoodleEnterprise() {
  return (
    <svg className="size-full text-teal-900" fill="none" viewBox="0 0 400 320">
      <g stroke="currentColor" strokeLinecap="round">
        <circle cx="200" cy="155" r="118" className="text-teal-900/20" strokeDasharray="5 9" strokeWidth="0.8" />
        <path className="experience-sketch-ink" d="M70 70 H160 V145 H70 Z" strokeWidth="1.7" style={{ animationDelay: "80ms" }} />
        <path className="experience-sketch-ink" d="M240 55 H340 V140 H240 Z" strokeWidth="1.7" style={{ animationDelay: "160ms" }} />
        <path className="experience-sketch-ink" d="M90 175 H175 V255 H90 Z" strokeWidth="1.7" style={{ animationDelay: "240ms" }} />
        <path className="experience-sketch-ink" d="M230 165 H330 V260 H230 Z" strokeWidth="1.8" style={{ animationDelay: "320ms" }} />
        <path
          className="experience-sketch-ink"
          d="M160 105 H240 M130 145 V175 M230 210 H175 M285 165 V140"
          strokeWidth="1.35"
          strokeOpacity="0.55"
          style={{ animationDelay: "400ms" }}
        />
        <circle className="experience-sketch-node" cx="115" cy="105" r="5" style={{ animationDelay: "520ms" }} />
        <circle className="experience-sketch-node" cx="290" cy="95" r="5" style={{ animationDelay: "600ms" }} />
        <circle className="experience-sketch-node is-hot" cx="280" cy="210" r="7" style={{ animationDelay: "680ms" }} />
        <text x="85" y="58" className="experience-sketch-label" fill="currentColor">
          ARCH
        </text>
        <text x="255" y="42" className="experience-sketch-label" fill="currentColor">
          API
        </text>
        <text x="140" y="295" className="experience-sketch-note" fill="currentColor">
          systems · ownership
        </text>
      </g>
    </svg>
  );
}

function DoodleProduct() {
  return (
    <svg className="size-full text-teal-900" fill="none" viewBox="0 0 400 320">
      <g stroke="currentColor" strokeLinecap="round">
        <path className="experience-sketch-ink" d="M50 50 H175 V200 H50 Z" strokeWidth="1.8" style={{ animationDelay: "80ms" }} />
        <path
          className="experience-sketch-ink"
          d="M70 80 H155 M70 110 H140 M70 140 H150 M70 170 H130"
          strokeWidth="1.2"
          strokeOpacity="0.4"
          style={{ animationDelay: "160ms" }}
        />
        <path
          className="experience-sketch-ink"
          d="M210 70 C245 55 275 85 305 72 C325 64 345 88 370 78"
          strokeWidth="1.7"
          style={{ animationDelay: "240ms" }}
        />
        <path
          className="experience-sketch-ink"
          d="M210 120 C250 105 280 135 315 120 C335 112 350 135 375 128"
          strokeWidth="1.65"
          style={{ animationDelay: "320ms" }}
        />
        <path
          className="experience-sketch-ink"
          d="M210 170 C248 158 278 182 312 170 C332 162 350 180 372 174"
          strokeWidth="1.55"
          style={{ animationDelay: "400ms" }}
        />
        <path
          className="experience-sketch-ink"
          d="M110 200 V245 C110 275 155 295 210 295 C265 295 310 275 310 245 V200"
          strokeWidth="1.5"
          strokeOpacity="0.7"
          style={{ animationDelay: "480ms" }}
        />
        <circle className="experience-sketch-node" cx="112" cy="125" r="5" style={{ animationDelay: "600ms" }} />
        <circle className="experience-sketch-node is-hot" cx="300" cy="120" r="7" style={{ animationDelay: "680ms" }} />
        <text x="60" y="38" className="experience-sketch-label" fill="currentColor">
          UI
        </text>
        <text x="250" y="50" className="experience-sketch-label" fill="currentColor">
          API
        </text>
        <text x="120" y="312" className="experience-sketch-note" fill="currentColor">
          interface → product
        </text>
      </g>
    </svg>
  );
}

function DoodleFoundation() {
  return (
    <svg className="size-full text-teal-900" fill="none" viewBox="0 0 400 320">
      <g stroke="currentColor" strokeLinecap="round">
        <path d="M40 270 H360" className="text-teal-900/25" strokeWidth="1" />
        <path className="experience-sketch-ink" d="M60 210 H115 V270 H60 Z" strokeWidth="1.6" style={{ animationDelay: "80ms" }} />
        <path className="experience-sketch-ink" d="M135 165 H195 V270 H135 Z" strokeWidth="1.65" style={{ animationDelay: "160ms" }} />
        <path className="experience-sketch-ink" d="M215 115 H280 V270 H215 Z" strokeWidth="1.7" style={{ animationDelay: "240ms" }} />
        <path className="experience-sketch-ink" d="M300 70 H370 V270 H300 Z" strokeWidth="1.8" style={{ animationDelay: "320ms" }} />
        <path
          className="experience-sketch-ink"
          d="M85 190 C140 150 190 120 245 90 C285 68 320 55 350 42"
          strokeWidth="1.6"
          strokeOpacity="0.65"
          style={{ animationDelay: "420ms" }}
        />
        <circle className="experience-sketch-node" cx="88" cy="210" r="5" style={{ animationDelay: "560ms" }} />
        <circle className="experience-sketch-node" cx="165" cy="165" r="5" style={{ animationDelay: "620ms" }} />
        <circle className="experience-sketch-node" cx="248" cy="115" r="5.5" style={{ animationDelay: "680ms" }} />
        <circle className="experience-sketch-node is-hot" cx="335" cy="70" r="7" style={{ animationDelay: "740ms" }} />
        <text x="50" y="50" className="experience-sketch-label" fill="currentColor">
          START
        </text>
        <text x="300" y="48" className="experience-sketch-label" fill="currentColor">
          GROW
        </text>
        <text x="110" y="305" className="experience-sketch-note" fill="currentColor">
          learn · build · rise
        </text>
      </g>
    </svg>
  );
}
