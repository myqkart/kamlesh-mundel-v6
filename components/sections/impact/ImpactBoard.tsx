"use client";

import type { ImpactStory } from "@/data/impact";
import Link from "next/link";

type ImpactBoardProps = {
  story: ImpactStory;
  index: number;
};

/** Full-bleed cause → effect board — unique to Impact, not a sticky sidebar. */
export function ImpactBoard({ story, index }: ImpactBoardProps) {
  const flip = index % 2 === 1;

  return (
    <article
      data-impact-story={story.id}
      className={`impact-board cred-write ${story.emphasis ? "is-emphasis" : ""}`}
      style={{ animationDelay: `${280 + index * 140}ms` }}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <div className="flex items-baseline gap-x-3">
          <span className="font-sketch -rotate-2 text-[1.7rem] leading-none text-teal-700 md:text-[1.9rem]">
            {story.number}
          </span>
          <span className="font-sketch rotate-1 text-[1.55rem] text-teal-700/80 md:text-[1.7rem]">
            {story.dimension}
          </span>
        </div>
        <Link
          href={story.projectHref}
          className="sketch-cta font-sketch text-[1.45rem] text-teal-700 md:text-[1.6rem]"
        >
          {story.projectTitle} impact
          <svg
            aria-hidden="true"
            className="cta-arrow h-3 w-5 overflow-visible"
            fill="none"
            viewBox="0 0 20 12"
          >
            <path
              d="M1 6h16M13 2l4 4-4 4"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </Link>
      </div>

      <h3
        className={`mt-3 max-w-[28rem] font-display text-teal-900 ${
          flip ? "rotate-1" : "-rotate-1"
        } ${
          story.emphasis
            ? "text-[clamp(2rem,4vw,3.1rem)] leading-[0.95]"
            : "text-[clamp(1.7rem,3.2vw,2.5rem)] leading-[0.98]"
        }`}
      >
        {story.title}
      </h3>

      <p
        className={`mt-3 max-w-[34rem] font-sketch text-[1.65rem] leading-snug text-teal-700 md:text-[1.85rem] ${
          flip ? "-rotate-1" : "rotate-1"
        }`}
      >
        {story.transformation}
      </p>

      {/* Cause → effect strip */}
      <div className="mt-8 grid items-stretch gap-6 md:gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <div className={flip ? "lg:order-3" : "lg:order-1"}>
          <ImpactPane
            label="challenge"
            body={story.challenge}
            tone="in"
            tilt={flip ? "rotate-1" : "-rotate-1"}
          />
        </div>

        <div className="lg:order-2">
          <ImpactBridge intervention={story.intervention} flip={flip} />
        </div>

        <div className={flip ? "lg:order-1" : "lg:order-3"}>
          <ImpactPane
            label="outcome"
            body={story.outcome}
            tone="out"
            tilt={flip ? "-rotate-1" : "rotate-1"}
          />
        </div>
      </div>

      <svg
        aria-hidden="true"
        className="mt-8 h-4 w-full max-w-[28rem] overflow-visible text-teal-900/30"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 420 16"
      >
        <path
          className="impact-line"
          d="M2 9c40-5 80 4 120-1 48-6 90 7 140 1 42-5 80 4 120 2 20-1 32 1 36 1"
          pathLength={1}
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
          style={{ animationDelay: `${480 + index * 140}ms` }}
        />
      </svg>
    </article>
  );
}

function ImpactPane({
  label,
  body,
  tone,
  tilt,
}: {
  label: string;
  body: string;
  tone: "in" | "out";
  tilt: string;
}) {
  return (
    <div
      className={`impact-pane relative ${tilt} rounded-[1.25rem] border border-teal-900/25 px-5 py-5 md:px-6 md:py-6 ${
        tone === "out" ? "bg-teal-300/15" : "bg-transparent"
      }`}
      style={{
        borderRadius: tone === "out" ? "1.4rem 0.9rem 1.5rem 1.1rem" : "0.9rem 1.5rem 1rem 1.35rem",
      }}
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full text-teal-900/20"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <path
          d="M3 8 C 28 2, 70 3, 96 7 C 98 30, 98 68, 95 93 C 68 97, 28 96, 4 92 C 2 65, 2 32, 3 8 Z"
          stroke="currentColor"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <p className="relative font-sketch text-[1.5rem] leading-none text-teal-700 md:text-[1.65rem]">
        {label}
      </p>
      <p className="relative mt-3 text-[1.05rem] leading-snug text-teal-900/80 md:text-[1.12rem]">
        {body}
      </p>
    </div>
  );
}

function ImpactBridge({
  intervention,
  flip,
}: {
  intervention: string;
  flip: boolean;
}) {
  return (
    <div className="relative flex min-h-[7rem] flex-col items-center justify-center px-2">
      <svg
        aria-hidden="true"
        className={`hidden h-16 w-28 text-teal-900 lg:block ${flip ? "-scale-x-100" : ""}`}
        fill="none"
        viewBox="0 0 112 64"
      >
        <path
          className="impact-path"
          d="M4 32c18-2 34 6 52 0s34-4 52 2"
          pathLength={1}
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
        <path
          d="M92 22c6 4 10 8 14 12-5 3-10 7-16 9"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.6"
        />
        <circle
          cx="56"
          cy="32"
          r="5"
          fill="var(--color-teal-300)"
          stroke="currentColor"
          strokeWidth="1.3"
        />
      </svg>
      <p className="mt-2 max-w-[14rem] text-center font-sketch text-[1.35rem] leading-snug text-teal-700 md:text-[1.5rem] lg:mt-3">
        {intervention}
      </p>
      <p className="mt-1 font-sketch text-[1.2rem] text-teal-500 lg:hidden">↓</p>
    </div>
  );
}
