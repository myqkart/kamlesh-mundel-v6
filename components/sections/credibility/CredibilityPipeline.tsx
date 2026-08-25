const stages = [
  "Idea",
  "Design",
  "Engineering",
  "Integration",
  "Ship",
] as const;

export function CredibilityPipeline() {
  return (
    <div className="relative">
      <p
        className="cred-write font-sketch text-[1.2rem] text-teal-700 md:text-[1.35rem]"
        style={{ animationDelay: "700ms" }}
      >
        from interface to infrastructure
      </p>

      <div className="relative mt-8 md:mt-10">
        {/* Ink rail — nodes only, never overlaps labels */}
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
              d="M20 12c70-5 140 6 210 0s140 6 210 0 140 6 210 0 140 5 190 1"
              pathLength={1}
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.7"
              style={{ animationDelay: "820ms" }}
            />
          </svg>

          <div className="relative z-10 grid h-full grid-cols-5 items-center">
            {stages.map((stage, index) => (
              <span
                key={`node-${stage}`}
                aria-hidden="true"
                className="cred-node flex justify-start"
                style={{ animationDelay: `${900 + index * 120}ms` }}
              >
                <span className="size-3 rounded-full border-[1.5px] border-teal-900 bg-off-white md:size-3.5" />
              </span>
            ))}
          </div>
        </div>

        <ol className="mt-5 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:mt-6 md:grid-cols-5 md:gap-4">
          {stages.map((stage, index) => (
            <li
              key={stage}
              className="cred-write min-w-0"
              style={{ animationDelay: `${980 + index * 110}ms` }}
            >
              <span className="mb-3 flex md:hidden" aria-hidden="true">
                <span className="size-2.5 rounded-full border border-teal-700 bg-off-white" />
              </span>
              <span className="block font-display text-[1.05rem] leading-none tracking-[-0.02em] text-teal-900 md:text-[1.15rem]">
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
