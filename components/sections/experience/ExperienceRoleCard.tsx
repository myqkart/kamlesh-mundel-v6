"use client";

import type { ExperienceRole } from "@/data/experience";

type ExperienceRoleCardProps = {
  role: ExperienceRole;
  active: boolean;
  index: number;
};

export function ExperienceRoleCard({
  role,
  active,
  index,
}: ExperienceRoleCardProps) {
  const compact = !role.current;

  return (
    <article
      data-experience-role={role.id}
      className={`experience-role cred-write ${role.current ? "is-current" : "is-past"} ${active ? "is-active" : ""}`}
      style={{ animationDelay: `${380 + index * 140}ms` }}
    >
      <div className="experience-role-meta">
        <span className="font-sketch text-[1.2rem] leading-none text-teal-700 md:text-[1.35rem]">
          {role.number}
        </span>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-teal-500">
          {role.start} — {role.end}
        </span>
        {role.current ? (
          <span className="experience-now font-mono text-[0.62rem] uppercase tracking-[0.18em] text-teal-700">
            Now
          </span>
        ) : null}
      </div>

      <div className={`mt-4 ${compact ? "md:mt-5" : "md:mt-6"}`}>
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-teal-500">
          {role.domain}
        </p>

        <h3
          className={`mt-3 font-display wonk leading-[0.95] tracking-[-0.03em] text-teal-900 ${
            role.current
              ? "text-[clamp(2rem,4.2vw,3.35rem)]"
              : "text-[clamp(1.55rem,2.8vw,2.15rem)]"
          }`}
        >
          {role.company}
        </h3>

        {role.companyLegal ? (
          <p className="mt-2 text-[0.92rem] text-teal-900/55">
            {role.companyLegal}
          </p>
        ) : null}

        <p
          className={`mt-3 font-display tracking-[-0.02em] text-teal-700 ${
            role.current
              ? "text-[clamp(1.25rem,2vw,1.65rem)]"
              : "text-[1.15rem] md:text-[1.25rem]"
          }`}
        >
          {role.title}
        </p>

        <p className="mt-2 font-sketch text-[1.05rem] text-teal-700/80 md:text-[1.15rem]">
          {role.location}
        </p>
      </div>

      <p
        className={`mt-5 max-w-[36rem] leading-relaxed text-teal-900/80 ${
          role.current ? "text-[1.05rem] md:text-[1.12rem]" : "text-[1rem] md:text-[1.05rem]"
        }`}
      >
        {role.scope}
      </p>

      <ul
        className={`mt-6 max-w-[34rem] space-y-2.5 ${role.current ? "" : "md:space-y-2"}`}
      >
        {role.responsibilities.map((item) => (
          <li
            key={item}
            className={`experience-point leading-relaxed text-teal-900/75 ${
              role.current ? "text-[0.98rem] md:text-[1.02rem]" : "text-[0.95rem]"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>

      {role.impact ? (
        <p
          className={`mt-6 max-w-[32rem] font-sketch leading-snug text-teal-700 ${
            role.current
              ? "text-[1.25rem] md:text-[1.35rem]"
              : "text-[1.15rem] md:text-[1.2rem]"
          }`}
        >
          {role.impact}
        </p>
      ) : null}

      {role.note ? (
        <p className="mt-5 max-w-[30rem] text-[0.95rem] leading-relaxed text-teal-900/65">
          {role.note}
        </p>
      ) : null}

      <dl className="mt-6">
        <dt className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-teal-500">
          Focus
        </dt>
        <dd className="mt-2 font-sketch text-[1.15rem] leading-relaxed text-teal-900 md:text-[1.25rem]">
          {role.focus.join(" · ")}
        </dd>
      </dl>

      <svg
        aria-hidden="true"
        className="mt-6 h-3 w-[min(100%,18rem)] overflow-visible text-teal-700/60"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 280 12"
      >
        <path
          className="experience-line"
          d="M2 8c30-3 60 2 90-1 34-3 64 4 96 1 26-2 48 2 70 2"
          pathLength={1}
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
          style={{ animationDelay: `${520 + index * 140}ms` }}
        />
      </svg>
    </article>
  );
}
