"use client";

import type { ApproachPrinciple } from "@/data/engineering-approach";

type ApproachVisualProps = {
  principles: readonly ApproachPrinciple[];
  activeIndex: number;
};

const nodes = [
  { x: 72, y: 48, label: "Q" },
  { x: 168, y: 92, label: "SYS" },
  { x: 92, y: 168, label: "SIM" },
  { x: 210, y: 198, label: "UX" },
  { x: 138, y: 268, label: "REL" },
  { x: 232, y: 318, label: "SHIP" },
] as const;

const paths = [
  "M72 48 C110 54 138 70 168 92",
  "M168 92 C148 118 112 142 92 168",
  "M92 168 C128 172 176 182 210 198",
  "M210 198 C188 226 156 248 138 268",
  "M138 268 C168 278 206 298 232 318",
] as const;

export function ApproachVisual({
  principles,
  activeIndex,
}: ApproachVisualProps) {
  return (
    <div aria-hidden="true" className="approach-visual relative">
      <svg
        className="h-auto w-full max-w-[18rem] text-teal-900 md:max-w-[20rem]"
        fill="none"
        viewBox="0 0 280 360"
      >
        <g className="text-teal-900/20" stroke="currentColor">
          <path d="M28 28 H72 M28 28 V72" strokeWidth="1.1" />
          <path d="M252 332 H208 M252 332 V288" strokeWidth="1.1" />
          <circle cx="140" cy="180" r="118" strokeDasharray="3 7" strokeWidth="0.7" />
        </g>

        {paths.map((d, index) => {
          const drawn = index < activeIndex;
          const active = index === activeIndex - 1;

          return (
            <path
              key={d}
              className={`approach-path ${drawn ? "is-drawn" : ""} ${active ? "is-active" : ""}`}
              d={d}
              pathLength={1}
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
            />
          );
        })}

        {nodes.map((node, index) => {
          const principle = principles[index];
          const active = index === activeIndex;
          const passed = index < activeIndex;

          return (
            <g
              key={node.label}
              className={`approach-node ${active ? "is-active" : ""} ${passed ? "is-passed" : ""}`}
            >
              {active ? (
                <circle
                  className="approach-node-ring"
                  cx={node.x}
                  cy={node.y}
                  r="16"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              ) : null}
              <circle
                cx={node.x}
                cy={node.y}
                r="5.5"
                fill="var(--color-off-white)"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <text
                x={node.x + 14}
                y={node.y - 10}
                className="approach-node-label"
                fill="currentColor"
              >
                {principle?.number ?? node.label}
              </text>
            </g>
          );
        })}
      </svg>

      <p className="mt-4 max-w-[16rem] font-sketch text-[1.15rem] leading-snug text-teal-700/80">
        problem → system → craft → ship
      </p>
    </div>
  );
}
