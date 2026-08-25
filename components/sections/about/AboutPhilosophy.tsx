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
        className="cred-write font-sketch text-[1.6rem] text-teal-700 md:text-[1.8rem]"
        style={{ animationDelay: "1100ms" }}
      >
        principles I build with
      </p>

      <ul className="mt-5 grid gap-6 sm:grid-cols-2 lg:mt-6 lg:gap-x-10 lg:gap-y-8">
        {principles.map((principle, index) => (
          <li
            key={principle.title}
            className="cred-write"
            style={{ animationDelay: `${1220 + index * 140}ms` }}
          >
            <div className="about-principle max-w-[26rem]">
              <span className="block -rotate-1 font-display text-[1.55rem] leading-none text-teal-900 md:text-[1.75rem]">
                {principle.title}
              </span>
              <p className="mt-2 text-[1.08rem] leading-snug text-teal-900/75 md:text-[1.12rem]">
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
