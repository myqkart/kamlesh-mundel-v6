"use client";

import type { ApproachPrinciple } from "@/data/engineering-approach";

type ApproachDetailProps = {
  principle: ApproachPrinciple;
  index: number;
  total: number;
};

export function ApproachDetail({
  principle,
  index,
  total,
}: ApproachDetailProps) {
  return (
    <div
      role="tabpanel"
      id={`approach-panel-${principle.id}`}
      aria-labelledby={`approach-tab-${principle.id}`}
      className="approach-detail"
    >
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-sketch text-[1.25rem] leading-none text-teal-700 md:text-[1.4rem]">
          {principle.number}
        </p>
        <p
          aria-hidden="true"
          className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-teal-500"
        >
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
      </div>

      <h3 className="mt-4 font-display wonk text-[clamp(1.55rem,2.6vw,2.15rem)] leading-[1.05] tracking-[-0.03em] text-teal-900">
        {principle.title}
      </h3>

      <p className="mt-5 max-w-[28rem] font-sketch text-[1.35rem] leading-snug text-teal-700 md:text-[1.5rem]">
        {principle.philosophy}
      </p>

      <p className="mt-5 max-w-[30rem] text-[1.02rem] leading-relaxed text-teal-900/80 md:text-[1.08rem]">
        {principle.explanation}
      </p>

      <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
        {principle.keywords.map((keyword) => (
          <li
            key={keyword}
            className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-teal-500"
          >
            {keyword}
          </li>
        ))}
      </ul>

      <div
        aria-hidden="true"
        className="approach-progress mt-8"
        style={{ ["--approach-progress" as string]: (index + 1) / total }}
      >
        <span className="approach-progress-track" />
        <span className="approach-progress-fill" />
      </div>
    </div>
  );
}
