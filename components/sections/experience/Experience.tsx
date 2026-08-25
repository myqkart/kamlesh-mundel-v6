"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import { education, experienceRoles } from "@/data/experience";
import { useSectionParallax } from "@/hooks/useSectionParallax";
import { ExperienceAltitude } from "./ExperienceAltitude";
import { ExperienceChapter } from "./ExperienceChapter";

export function Experience() {
  const ref = useRef<HTMLElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState(experienceRoles[0]!.id);

  useSectionParallax(ref);

  const setActiveFromScroll = useEffectEvent(() => {
    const root = journeyRef.current;
    if (!root) return;

    const cards = root.querySelectorAll<HTMLElement>("[data-experience-role]");
    if (!cards.length) return;

    const focusY = window.innerHeight * 0.4;
    let bestId = activeId;
    let bestDist = Number.POSITIVE_INFINITY;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const mid = rect.top + rect.height * 0.22;
      const dist = Math.abs(mid - focusY);
      if (dist < bestDist) {
        bestDist = dist;
        bestId = card.getAttribute("data-experience-role") ?? bestId;
      }
    });

    setActiveId((prev) => (prev === bestId ? prev : bestId));
  });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    setReady(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let ticking = false;
    let frame = 0;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      frame = requestAnimationFrame(() => {
        setActiveFromScroll();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    setActiveFromScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const jumpTo = (id: string) => {
    setActiveId(id);
    const node = journeyRef.current?.querySelector<HTMLElement>(
      `[data-experience-role="${id}"]`,
    );
    node?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section
      ref={ref}
      id="experience"
      aria-labelledby="experience-heading"
      className={`relative isolate overflow-x-clip ${ready ? "experience-ready" : ""} ${visible ? "is-visible" : ""}`}
    >
      {/* Soft trail doodle across the sheet */}
      <div
        aria-hidden="true"
        className="parallax-back pointer-events-none absolute inset-0 z-0 overflow-hidden text-teal-900"
      >
        <svg
          className="absolute top-[18%] left-[8%] hidden h-[70%] w-[84%] text-teal-900/[0.07] lg:block"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 1000 800"
        >
          <path
            d="M80 60 C200 120 180 220 320 280 C480 360 420 480 580 540 C720 590 780 680 920 740"
            stroke="currentColor"
            strokeDasharray="6 14"
            strokeLinecap="round"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="relative z-10 sheet-block flex flex-col gap-10 md:gap-12">
        <header className="parallax-slow grid items-end gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="max-w-[40rem] lg:col-span-7">
            <p
              className="cred-write font-sketch -rotate-2 text-[1.75rem] leading-none text-teal-700 md:text-[1.95rem]"
              style={{ animationDelay: "60ms" }}
            >
              07 · experience
            </p>
            <h2
              id="experience-heading"
              className="cred-write mt-3 -rotate-1 font-display text-[clamp(2.5rem,5.2vw,4.4rem)] leading-[0.9] text-teal-900"
              style={{ animationDelay: "160ms" }}
            >
              Experience, in context.
            </h2>
            <p
              className="cred-write mt-4 max-w-[28rem] rotate-1 font-sketch text-[1.65rem] leading-snug text-teal-700 md:text-[1.85rem]"
              style={{ animationDelay: "280ms" }}
            >
              a journey map — each chapter drew a new layer of how I build
            </p>
          </div>

          <div className="lg:col-span-5 lg:justify-self-end">
            <ExperienceAltitude activeId={activeId} onSelect={jumpTo} />
          </div>
        </header>

        {/* Journey chapters — alternate story / doodle like a winding path */}
        <div
          ref={journeyRef}
          className="parallax-mid relative flex flex-col gap-16 md:gap-20 lg:gap-24"
        >
          {experienceRoles.map((role, index) => (
            <ExperienceChapter
              key={role.id}
              role={role}
              index={index}
              total={experienceRoles.length}
              active={role.id === activeId}
              onActivate={setActiveId}
            />
          ))}
        </div>

        <div
          className="parallax-slow cred-write relative z-10 max-w-[36rem]"
          style={{ animationDelay: `${420 + experienceRoles.length * 140}ms` }}
        >
          <p className="-rotate-1 font-sketch text-[1.7rem] leading-snug text-teal-700 md:text-[1.9rem]">
            Every role added another layer to how I think about products,
            systems, teams, and engineering.
          </p>
          <p className="mt-6 font-sketch text-[1.35rem] leading-snug text-teal-700/80 md:text-[1.5rem]">
            {education.degree} · {education.school}
            <span className="mt-1 block text-teal-500">
              {education.start} – {education.end} · {education.location}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
