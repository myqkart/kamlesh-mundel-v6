"use client";

import { expertiseFlow } from "@/data/technical-expertise";

export function ExpertiseFlow() {
  return (
    <div className="cred-write" style={{ animationDelay: "520ms" }}>
      <p className="font-sketch text-[1.2rem] text-teal-700 md:text-[1.35rem]">
        how the stack connects
      </p>

      <div className="relative mt-7 md:mt-8">
        <div className="relative h-5 md:h-6">
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible text-teal-900 md:block"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 1000 24"
          >
            <path
              className="cred-ink"
              d="M18 12c72-6 140 7 210 0s140 7 210 0 140 7 210 0 140 5 190 1"
              pathLength={1}
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.6"
              style={{ animationDelay: "700ms" }}
            />
          </svg>

          <div className="relative z-10 grid h-full grid-cols-5 items-center">
            {expertiseFlow.map((stage, index) => (
              <span
                key={`node-${stage}`}
                aria-hidden="true"
                className="cred-node flex justify-start"
                style={{ animationDelay: `${780 + index * 90}ms` }}
              >
                <span className="size-3 rounded-full border-[1.5px] border-teal-900 bg-off-white md:size-3.5" />
              </span>
            ))}
          </div>
        </div>

        <ol className="mt-5 grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-3 md:mt-6 md:grid-cols-5 md:gap-3">
          {expertiseFlow.map((stage, index) => (
            <li
              key={stage}
              className="cred-write min-w-0"
              style={{ animationDelay: `${860 + index * 80}ms` }}
            >
              <span className="mb-3 flex md:hidden" aria-hidden="true">
                <span className="size-2.5 rounded-full border border-teal-700 bg-off-white" />
              </span>
              <span className="block font-display text-[1.02rem] leading-none tracking-[-0.02em] text-teal-900 md:text-[1.1rem]">
                {stage}
              </span>
              <span className="mt-1.5 block font-sketch text-[1.05rem] leading-none text-teal-700">
                0{index + 1}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
