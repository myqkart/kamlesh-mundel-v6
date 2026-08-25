const stages = [
  { label: "Curiosity", note: "ask better questions" },
  { label: "Problem", note: "find the real constraint" },
  { label: "Exploration", note: "map the system" },
  { label: "Engineering", note: "build with intent" },
  { label: "Product", note: "ship what lasts" },
] as const;

export function AboutNarrative() {
  return (
    <div className="relative lg:pt-2">
      <p
        className="cred-write font-sketch text-[1.6rem] text-teal-700 md:text-[1.8rem]"
        style={{ animationDelay: "560ms" }}
      >
        how I move from idea to product
      </p>

      <div className="relative mt-8 md:mt-10">
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
              d="M18 12c68-6 138 7 208 0s138 7 208 0 138 7 208 0 138 5 188 1"
              pathLength={1}
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.6"
              style={{ animationDelay: "760ms" }}
            />
          </svg>

          <div className="relative z-10 grid h-full grid-cols-5 items-center">
            {stages.map((stage, index) => (
              <span
                key={`node-${stage.label}`}
                aria-hidden="true"
                className="cred-node flex justify-start"
                style={{ animationDelay: `${860 + index * 110}ms` }}
              >
                <span className="size-3 rounded-full border-[1.5px] border-teal-900 bg-off-white md:size-3.5" />
              </span>
            ))}
          </div>
        </div>

        <ol className="mt-5 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:mt-6 md:grid-cols-5 md:gap-3">
          {stages.map((stage, index) => (
            <li
              key={stage.label}
              className="cred-write min-w-0"
              style={{ animationDelay: `${940 + index * 100}ms` }}
            >
              <span className="mb-3 flex md:hidden" aria-hidden="true">
                <span className="size-2.5 rounded-full border border-teal-700 bg-off-white" />
              </span>
              <span className="block font-display text-[1.02rem] leading-none tracking-[-0.02em] text-teal-900 md:text-[1.1rem]">
                {stage.label}
              </span>
              <span className="mt-1.5 block font-sketch text-[1.05rem] leading-snug text-teal-700">
                {stage.note}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <p
        className="cred-write mt-10 hidden font-sketch text-[1.35rem] text-teal-700/80 md:block"
        style={{ animationDelay: "1480ms" }}
      >
        think · design · build · ship · refine
      </p>
    </div>
  );
}
