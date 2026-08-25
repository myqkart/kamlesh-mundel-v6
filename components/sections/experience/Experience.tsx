"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import {
  experienceMeta,
  experienceRoles,
} from "@/data/experience";
import { useSectionParallax } from "@/hooks/useSectionParallax";
import { ExperienceRoleCard } from "./ExperienceRoleCard";
import { ExperienceSketchbook } from "./ExperienceSketchbook";

export function Experience() {
  const ref = useRef<HTMLElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState(experienceRoles[0]!.id);

  useSectionParallax(ref);

  const setActiveFromScroll = useEffectEvent(() => {
    const root = rolesRef.current;
    if (!root) return;

    const cards = root.querySelectorAll<HTMLElement>("[data-experience-role]");
    if (!cards.length) return;

    const focusY = window.innerHeight * 0.38;
    let bestId = activeId;
    let bestDist = Number.POSITIVE_INFINITY;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const mid = rect.top + rect.height * 0.25;
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

  return (
    <section
      ref={ref}
      id="experience"
      aria-labelledby="experience-heading"
      className={`paper-hero relative isolate overflow-x-clip ${ready ? "experience-ready" : ""} ${visible ? "is-visible" : ""}`}
    >
      <div className="paper-grain parallax-back opacity-[0.12]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[90rem] flex-col gap-14 px-[7vw] py-[clamp(4.5rem,12vh,8.5rem)] md:gap-16 lg:gap-20">
        <header className="parallax-slow grid items-end gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="max-w-[42rem] lg:col-span-7">
            <p
              className="cred-write font-sketch -rotate-1 text-[1.3rem] leading-none text-teal-700 md:text-[1.45rem]"
              style={{ animationDelay: "60ms" }}
            >
              07 · experience
            </p>
            <h2
              id="experience-heading"
              className="cred-write mt-5 font-display wonk text-[clamp(2.35rem,4.8vw,4rem)] leading-[0.95] tracking-[-0.03em] text-teal-900"
              style={{ animationDelay: "160ms" }}
            >
              Experience, in context.
            </h2>
            <p
              className="cred-write mt-6 max-w-[34rem] text-[1.05rem] leading-relaxed text-teal-900/80 md:text-[1.1rem]"
              style={{ animationDelay: "280ms" }}
            >
              A progression through roles, responsibilities, and increasingly
              complex engineering challenges.
            </p>
          </div>

          <div
            className="cred-write lg:col-span-5 lg:justify-self-end lg:text-right"
            style={{ animationDelay: "340ms" }}
          >
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-teal-500">
              {experienceMeta.location}
            </p>
            <p className="mt-3 font-sketch text-[1.35rem] leading-snug text-teal-700 md:text-[1.5rem]">
              {experienceMeta.evolution}
            </p>
            <p className="mt-2 text-[0.98rem] text-teal-900/65">
              {experienceMeta.since}
            </p>
          </div>
        </header>

        {/* Tall track: sticky sketchbook background + scrolling roles */}
        <div ref={rolesRef} className="relative">
          <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
            <div className="experience-sketchbook-sticky sticky top-0 h-svh">
              <ExperienceSketchbook activeId={activeId} />
            </div>
          </div>

          <div className="relative z-10 grid items-start gap-10 lg:grid-cols-12">
            <div className="relative lg:col-span-6 xl:col-span-6">
              <div
                aria-hidden="true"
                className="experience-spine absolute top-3 bottom-3 left-0 hidden w-px bg-teal-900/20 md:block"
              />

              <ol className="flex flex-col gap-16 md:gap-20 md:pl-10 lg:gap-24">
                {experienceRoles.map((role, index) => (
                  <li key={role.id} className="relative">
                    <span
                      aria-hidden="true"
                      className={`experience-spine-node absolute top-2 -left-10 hidden md:block ${
                        role.id === activeId ? "is-active" : ""
                      } ${role.current ? "is-current" : ""}`}
                    />
                    <ExperienceRoleCard
                      role={role}
                      active={role.id === activeId}
                      index={index}
                    />
                  </li>
                ))}
              </ol>
            </div>

            {/* Keeps text clear of the sketch field */}
            <div className="hidden lg:col-span-6 lg:block" aria-hidden="true" />
          </div>
        </div>

        <p
          className="parallax-slow cred-write relative z-10 max-w-[36rem] font-sketch text-[1.3rem] leading-snug text-teal-700 md:text-[1.45rem]"
          style={{ animationDelay: `${420 + experienceRoles.length * 140}ms` }}
        >
          Every role added another layer to how I think about products, systems,
          teams, and engineering.
        </p>
      </div>
    </section>
  );
}
