const principles = [
  {
    title: "Simplicity",
    statement: "Complex systems should feel simple to the people using them.",
  },
  {
    title: "Ownership",
    statement:
      "Good engineering means caring about what happens beyond your own piece of the codebase.",
  },
  {
    title: "Craft",
    statement:
      "The difference is often in the details nobody explicitly asked for.",
  },
  {
    title: "Curiosity",
    statement: "The best solutions usually begin with asking better questions.",
  },
] as const;

export function AboutPhilosophy() {
  return (
    <div>
      <p
        className="cred-write font-sketch text-[1.2rem] text-teal-700 md:text-[1.35rem]"
        style={{ animationDelay: "1100ms" }}
      >
        principles I build with
      </p>

      <ul className="mt-8 grid gap-10 sm:grid-cols-2 lg:mt-10 lg:gap-x-14 lg:gap-y-12">
        {principles.map((principle, index) => (
          <li
            key={principle.title}
            className="cred-write"
            style={{ animationDelay: `${1220 + index * 140}ms` }}
          >
            <div className="about-principle max-w-[28rem]">
              <span className="block font-display text-[1.35rem] leading-none tracking-[-0.02em] text-teal-900 md:text-[1.5rem]">
                {principle.title}
              </span>
              <p className="mt-3 text-[1.02rem] leading-relaxed text-teal-900/80 md:text-[1.08rem]">
                {principle.statement}
              </p>
              <svg
                aria-hidden="true"
                className="mt-4 h-3 w-[min(100%,16rem)] overflow-visible text-teal-700/70"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 260 12"
              >
                <path
                  className="principle-line"
                  d="M2 8c28-3 56 2 84-1 32-3 60 4 90 1 24-2 44 2 62 2"
                  pathLength={1}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  style={{ animationDelay: `${1380 + index * 140}ms` }}
                />
              </svg>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
