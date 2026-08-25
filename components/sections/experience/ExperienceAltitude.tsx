"use client";

import { experienceMeta, experienceRoles } from "@/data/experience";

type ExperienceAltitudeProps = {
  activeId: string;
  onSelect: (id: string) => void;
};

/** Hand-drawn climb meter — full stack → sr. full stack. */
export function ExperienceAltitude({
  activeId,
  onSelect,
}: ExperienceAltitudeProps) {
  const climb = [...experienceRoles].reverse();

  return (
    <div
      className="experience-altitude cred-write relative"
      style={{ animationDelay: "220ms" }}
    >
      <p className="font-sketch -rotate-1 text-[1.55rem] text-teal-700 md:text-[1.7rem]">
        the climb
      </p>
      <p className="mt-1 max-w-[16rem] font-sketch text-[1.35rem] leading-snug text-teal-700/75 md:text-[1.45rem]">
        {experienceMeta.evolution}
      </p>

      <div className="relative mt-6 pl-2">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute top-2 bottom-2 left-3 w-8 text-teal-900/35"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 32 200"
        >
          <path
            className="experience-line"
            d="M10 190 C14 150 6 110 12 70 C16 40 8 20 14 8"
            pathLength={1}
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.6"
          />
        </svg>

        <ol className="relative flex flex-col-reverse gap-5">
          {climb.map((role, i) => {
            const chronologicalIndex = i;
            const isHot = role.id === activeId;
            // Height metaphor: later career = higher on climb
            const heightLabel =
              chronologicalIndex === climb.length - 1
                ? "summit"
                : chronologicalIndex === 0
                  ? "base camp"
                  : "ridge";

            return (
              <li key={role.id}>
                <button
                  type="button"
                  className={`experience-altitude-step group flex w-full items-baseline gap-3 text-left ${
                    isHot ? "is-active" : ""
                  }`}
                  onClick={() => onSelect(role.id)}
                  onMouseEnter={() => onSelect(role.id)}
                >
                  <span
                    aria-hidden="true"
                    className={`experience-altitude-dot mt-1.5 size-2.5 shrink-0 rounded-full border-[1.5px] border-teal-900 ${
                      isHot ? "bg-teal-300" : "bg-off-white"
                    }`}
                  />
                  <span className="min-w-0">
                    <span
                      className={`block font-display leading-none text-teal-900 transition-transform duration-300 ${
                        isHot
                          ? "translate-x-1 text-[1.35rem] md:text-[1.5rem]"
                          : "text-[1.15rem] opacity-55 md:text-[1.25rem]"
                      }`}
                    >
                      {role.title}
                    </span>
                    <span
                      className={`mt-1 block font-sketch leading-none ${
                        isHot
                          ? "text-[1.35rem] text-teal-700"
                          : "text-[1.2rem] text-teal-700/50"
                      }`}
                    >
                      {heightLabel}
                      {role.current ? " · now" : ""}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <p className="mt-6 font-sketch text-[1.3rem] text-teal-500">
        {experienceMeta.since} · {experienceMeta.location}
      </p>
    </div>
  );
}
