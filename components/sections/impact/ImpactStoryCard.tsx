"use client";

import type { ImpactStory } from "@/data/impact";
import Link from "next/link";

type ImpactStoryCardProps = {
  story: ImpactStory;
  index: number;
  active: boolean;
  onActivate: (id: string) => void;
};

export function ImpactStoryCard({
  story,
  index,
  active,
  onActivate,
}: ImpactStoryCardProps) {
  return (
    <article
      data-impact-story={story.id}
      className={`impact-story cred-write ${story.emphasis ? "is-emphasis" : ""} ${active ? "is-active" : ""}`}
      style={{ animationDelay: `${420 + index * 120}ms` }}
      onMouseEnter={() => onActivate(story.id)}
      onFocusCapture={() => onActivate(story.id)}
    >
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <span className="font-sketch text-[1.2rem] leading-none text-teal-700 md:text-[1.35rem]">
          {story.number}
        </span>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-teal-500">
          {story.dimension}
        </span>
      </div>

      <h3
        className={`mt-4 font-display wonk tracking-[-0.03em] text-teal-900 ${
          story.emphasis
            ? "text-[clamp(1.75rem,3.2vw,2.55rem)] leading-[1.02]"
            : "text-[clamp(1.4rem,2.4vw,1.9rem)] leading-[1.05]"
        }`}
      >
        {story.title}
      </h3>

      <p className="mt-4 max-w-[34rem] font-sketch text-[1.25rem] leading-snug text-teal-700 md:text-[1.4rem]">
        {story.transformation}
      </p>

      <dl className="mt-7 grid gap-5 max-w-[36rem]">
        <div>
          <dt className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-teal-500">
            Challenge
          </dt>
          <dd className="mt-2 text-[1.02rem] leading-relaxed text-teal-900/80">
            {story.challenge}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-teal-500">
            Engineering
          </dt>
          <dd className="mt-2 text-[1.02rem] leading-relaxed text-teal-900/80">
            {story.intervention}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-teal-500">
            Outcome
          </dt>
          <dd className="mt-2 text-[1.02rem] leading-relaxed text-teal-900/80">
            {story.outcome}
          </dd>
        </div>
      </dl>

      <p className="mt-7">
        <Link
          href={story.projectHref}
          className="sketch-cta font-sketch text-[1.2rem] text-teal-700 md:text-[1.3rem]"
        >
          See {story.projectTitle}
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
      </p>

      <svg
        aria-hidden="true"
        className="mt-6 h-3 w-[min(100%,16rem)] overflow-visible text-teal-700/60"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 260 12"
      >
        <path
          className="impact-line"
          d="M2 8c28-3 56 2 84-1 32-3 60 4 90 1 24-2 44 2 62 2"
          pathLength={1}
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
          style={{ animationDelay: `${560 + index * 120}ms` }}
        />
      </svg>
    </article>
  );
}
