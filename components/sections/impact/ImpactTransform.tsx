"use client";

import { impactArc, type ImpactStory } from "@/data/impact";

type ImpactTransformProps = {
  story: ImpactStory;
};

export function ImpactTransform({ story }: ImpactTransformProps) {
  return (
    <div aria-hidden="true" className="impact-transform">
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-sketch text-[1.25rem] leading-none text-teal-700 md:text-[1.4rem]">
          {story.number}
        </p>
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-teal-500">
          {story.dimension}
        </p>
      </div>

      <p className="mt-4 font-display text-[1.15rem] tracking-[-0.02em] text-teal-900 md:text-[1.25rem]">
        {story.title}
      </p>

      <svg
        className="mt-6 h-auto w-full max-w-[22rem] text-teal-900"
        fill="none"
        viewBox="0 0 320 280"
      >
        <g stroke="currentColor" strokeLinecap="round">
          <g className="text-teal-900/22">
            <path d="M24 24 H70 M24 24 V70" strokeWidth="1.1" />
            <path d="M296 256 H250 M296 256 V210" strokeWidth="1.1" />
            <circle cx="160" cy="140" r="108" strokeDasharray="4 8" strokeWidth="0.7" />
          </g>

          {/* Problem node */}
          <circle
            className="impact-node"
            cx="60"
            cy="140"
            r="18"
            fill="var(--color-off-white)"
            strokeWidth="1.6"
            style={{ animationDelay: "120ms" }}
          />
          {/* Engineering node */}
          <circle
            className="impact-node is-mid"
            cx="160"
            cy="140"
            r="22"
            fill="var(--color-off-white)"
            strokeWidth="1.7"
            style={{ animationDelay: "280ms" }}
          />
          {/* Outcome node */}
          <circle
            className="impact-node is-hot"
            cx="260"
            cy="140"
            r="18"
            fill="var(--color-teal-300)"
            strokeWidth="1.6"
            style={{ animationDelay: "440ms" }}
          />

          <path
            className="impact-path"
            d="M78 140 H138"
            pathLength={1}
            strokeWidth="1.5"
            style={{ animationDelay: "200ms" }}
          />
          <path
            className="impact-path"
            d="M182 140 H242"
            pathLength={1}
            strokeWidth="1.5"
            style={{ animationDelay: "360ms" }}
          />

          <path
            className="impact-path"
            d="M60 158 C60 210 110 235 160 235 C210 235 260 210 260 158"
            pathLength={1}
            strokeWidth="1.2"
            strokeOpacity="0.45"
            style={{ animationDelay: "500ms" }}
          />

          <text x="42" y="100" className="impact-label" fill="currentColor">
            IN
          </text>
          <text x="138" y="100" className="impact-label" fill="currentColor">
            BUILD
          </text>
          <text x="238" y="100" className="impact-label" fill="currentColor">
            OUT
          </text>
        </g>
      </svg>

      <ol className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
        {impactArc.map((step, index) => (
          <li
            key={step}
            className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-teal-500"
          >
            <span className="text-teal-700/70">0{index + 1}</span> {step}
          </li>
        ))}
      </ol>

      <p className="mt-5 max-w-[18rem] font-sketch text-[1.2rem] leading-snug text-teal-700/85">
        {story.transformation}
      </p>
    </div>
  );
}
