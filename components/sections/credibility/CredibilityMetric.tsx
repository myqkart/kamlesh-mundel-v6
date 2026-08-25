const signals = [
  {
    label: "Sr. Full Stack",
    detail: "current role",
    className: "font-display text-[1.2rem] md:text-[1.4rem]",
  },
  {
    label: "8+",
    detail: "projects shipped",
    className: "font-display text-[1.75rem] md:text-[2rem]",
  },
  {
    label: "Full Stack",
    detail: "end-to-end ownership",
    className: "font-sketch text-[1.45rem] md:text-[1.6rem]",
  },
  {
    label: "JS + Python",
    detail: "primary ecosystems",
    className: "font-display text-[1.1rem] tracking-[-0.01em] md:text-[1.2rem]",
  },
] as const;

export function CredibilityMetric() {
  return (
    <div className="grid gap-10 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-8 lg:gap-12">
      <div className="cred-write relative min-w-0" style={{ animationDelay: "280ms" }}>
        <p className="font-sketch text-[1.6rem] text-teal-700 md:text-[1.8rem]">
          professional experience
        </p>
        <p className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-teal-900">
          <span className="cred-years font-display text-[clamp(5rem,14vw,11rem)] leading-[0.78] tracking-[-0.05em]">
            4.5+
          </span>
          <span className="font-sketch text-[clamp(1.5rem,2.8vw,2.25rem)] leading-none text-teal-700">
            years
          </span>
        </p>
        <p className="mt-3 max-w-[16rem] text-[1.08rem] leading-snug text-teal-900/75">
          Turning messy problems into products people actually use.
        </p>
        <p className="mt-4 max-w-[18rem] font-sketch text-[1.25rem] leading-snug text-teal-700/80">
          Angular · Node.js · MySQL — HackerRank certified
        </p>
        <svg
          aria-hidden="true"
          className="pointer-events-none mt-3 h-3 w-[min(100%,20rem)] overflow-visible text-teal-700/65"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 320 12"
        >
          <path
            className="cred-ink"
            d="M2 8c36-4 72 3 108-1 40-4 76 5 114 1 28-3 52 2 74 2"
            pathLength={1}
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.7"
            style={{ animationDelay: "560ms" }}
          />
        </svg>
      </div>

      <ul className="flex flex-col gap-5 pl-3 sm:min-w-[12.5rem] sm:pb-2">
        {signals.map((signal, index) => (
          <li
            key={signal.label}
            className="cred-write"
            style={{ animationDelay: `${480 + index * 90}ms` }}
          >
            <div className="cred-signal pl-1">
              <span className={`block leading-none text-teal-900 ${signal.className}`}>
                {signal.label}
              </span>
              <span className="mt-1 block font-sketch text-[1.4rem] leading-none text-teal-700">
                {signal.detail}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
