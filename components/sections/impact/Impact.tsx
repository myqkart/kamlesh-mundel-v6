"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import { impactSignals, impactStories } from "@/data/impact";
import { useSectionParallax } from "@/hooks/useSectionParallax";
import { ImpactStoryCard } from "./ImpactStoryCard";
import { ImpactTransform } from "./ImpactTransform";

export function Impact() {
  const ref = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState(impactStories[0]!.id);

  useSectionParallax(ref);

  const activeIndex = Math.max(
    0,
    impactStories.findIndex((story) => story.id === activeId),
  );
  const activeStory = impactStories[activeIndex]!;

  const syncActive = useEffectEvent(() => {
    const root = listRef.current;
    if (!root) return;

    const cards = root.querySelectorAll<HTMLElement>("[data-impact-story]");
    if (!cards.length) return;

    const focusY = window.innerHeight * 0.4;
    let bestId = activeId;
    let bestDist = Number.POSITIVE_INFINITY;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const mid = rect.top + rect.height * 0.2;
      const dist = Math.abs(mid - focusY);
      if (dist < bestDist) {
        bestDist = dist;
        bestId = card.getAttribute("data-impact-story") ?? bestId;
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
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
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
        syncActive();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    syncActive();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={ref}
      id="impact"
      aria-labelledby="impact-heading"
      className={`paper-hero relative isolate overflow-x-clip ${ready ? "impact-ready" : ""} ${visible ? "is-visible" : ""}`}
    >
      <div className="paper-grain parallax-back opacity-[0.12]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[90rem] flex-col gap-14 px-[7vw] py-[clamp(4.5rem,12vh,8.5rem)] md:gap-16 lg:gap-20">
        <header className="parallax-slow grid items-end gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="max-w-[42rem] lg:col-span-7">
            <p
              className="cred-write font-sketch -rotate-1 text-[1.3rem] leading-none text-teal-700 md:text-[1.45rem]"
              style={{ animationDelay: "60ms" }}
            >
              09 · impact
            </p>
            <h2
              id="impact-heading"
              className="cred-write mt-5 font-display wonk text-[clamp(2.35rem,4.8vw,4rem)] leading-[0.95] tracking-[-0.03em] text-teal-900"
              style={{ animationDelay: "160ms" }}
            >
              Built to make a difference.
            </h2>
            <p
              className="cred-write mt-6 max-w-[36rem] text-[1.05rem] leading-relaxed text-teal-900/80 md:text-[1.1rem]"
              style={{ animationDelay: "280ms" }}
            >
              The goal isn&apos;t simply to ship more code. It&apos;s to make
              products more useful, systems more reliable, and complex workflows
              easier to operate.
            </p>
            <p
              className="cred-write mt-5 max-w-[32rem] font-sketch text-[1.3rem] leading-snug text-teal-700 md:text-[1.45rem]"
              style={{ animationDelay: "360ms" }}
            >
              The best measure of engineering is what changes after you ship.
            </p>
          </div>

          <ul
            className="cred-write flex flex-col gap-5 lg:col-span-5 lg:justify-self-end"
            style={{ animationDelay: "400ms" }}
          >
            {impactSignals.map((signal) => (
              <li key={signal.label} className="flex items-baseline gap-3">
                <span className="font-display wonk text-[clamp(1.75rem,3vw,2.35rem)] leading-none tracking-[-0.03em] text-teal-900">
                  {signal.label}
                </span>
                <span className="font-sketch text-[1.15rem] leading-snug text-teal-700 md:text-[1.25rem]">
                  {signal.detail}
                </span>
              </li>
            ))}
          </ul>
        </header>

        <div ref={listRef} className="relative grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="parallax-mid flex flex-col gap-16 md:gap-20 lg:col-span-7 lg:gap-24">
            {impactStories.map((story, index) => (
              <ImpactStoryCard
                key={story.id}
                story={story}
                index={index}
                active={story.id === activeId}
                onActivate={setActiveId}
              />
            ))}
          </div>

          <aside className="hidden lg:col-span-5 lg:block">
            <div className="impact-transform-sticky sticky top-[16vh]">
              <div
                key={activeStory.id}
                className="cred-write"
                style={{ animationDelay: "480ms" }}
              >
                <ImpactTransform story={activeStory} />
              </div>
            </div>
          </aside>
        </div>

        <p
          className="parallax-slow cred-write max-w-[36rem] font-sketch text-[1.3rem] leading-snug text-teal-700 md:text-[1.45rem]"
          style={{ animationDelay: `${520 + impactStories.length * 120}ms` }}
        >
          Good software reduces friction, enables people, and keeps delivering
          value after the code is written.
        </p>
      </div>
    </section>
  );
}
