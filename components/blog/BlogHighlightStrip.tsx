/** Process strip — investigate → draft → publish → ship */
export function BlogHighlightStrip() {
  const steps = [
    { num: "01", label: "investigate", note: "break things on purpose" },
    { num: "02", label: "draft", note: "sketch the solution" },
    { num: "03", label: "publish", note: "write it down" },
    { num: "04", label: "ship", note: "take it to production" },
  ] as const;

  return (
    <section aria-label="Writing process" className="blog-highlight-strip">
      <p className="cred-write font-sketch -rotate-1 text-[1.35rem] text-teal-700 md:text-[1.5rem]">
        how notes get written
      </p>
      <ol className="blog-highlight-grid mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li
            key={step.num}
            className="blog-highlight-card cred-write relative"
            style={{ animationDelay: `${120 + index * 80}ms` }}
          >
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 size-full text-teal-900/30"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <path
                d="M5 7 C 25 4, 72 5, 94 8 C 96 28, 95 72, 92 92 C 68 95, 28 94, 6 90 C 4 65, 4 30, 5 7 Z"
                stroke="currentColor"
                strokeWidth="1.2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <p className="relative z-[1] font-sketch text-[1.2rem] text-teal-700/70">
              {step.num}
            </p>
            <p className="relative z-[1] mt-1 font-display text-[1.45rem] leading-tight text-teal-900">
              {step.label}
            </p>
            <p className="relative z-[1] mt-1 font-sketch text-[1.05rem] text-teal-700/75">
              {step.note}
            </p>
            {index < steps.length - 1 ? (
              <svg
                aria-hidden="true"
                className="blog-highlight-connector absolute top-1/2 -right-3 hidden h-4 w-6 -translate-y-1/2 text-teal-700/40 lg:block"
                fill="none"
                viewBox="0 0 24 16"
              >
                <path
                  d="M2 8 H18 M12 4 l8 4 -8 4"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.3"
                />
              </svg>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
