"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import {
  approachPrinciples,
  type ApproachPrinciple,
} from "@/data/engineering-approach";
import { ApproachDetail } from "./ApproachDetail";
import { ApproachList } from "./ApproachList";
import { ApproachVisual } from "./ApproachVisual";

const STEP_VH = 1.55; // ~1.55 viewports of scroll per principle — slow enough to read

export function EngineeringApproach() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [scrubbing, setScrubbing] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverId, setHoverId] = useState<string | null>(null);

  const activePrinciple = approachPrinciples[activeIndex]!;
  const activeId = activePrinciple.id;
  const hoverIndex = hoverId
    ? approachPrinciples.findIndex((p) => p.id === hoverId)
    : -1;
  const displayIndex = hoverIndex >= 0 ? hoverIndex : activeIndex;
  const displayPrinciple = approachPrinciples[displayIndex]!;

  const syncFromScroll = useEffectEvent(() => {
    const track = trackRef.current;
    if (!track || !scrubbing) return;

    const rect = track.getBoundingClientRect();
    const travel = Math.max(1, track.offsetHeight - window.innerHeight);
    const raw = Math.max(0, Math.min(1, -rect.top / travel));

    // Hold each principle across its scroll band; ease into the next
    const steps = approachPrinciples.length;
    const next = Math.min(steps - 1, Math.floor(raw * steps + 1e-6));

    setActiveIndex((prev) => (prev === next ? prev : next));
    track.style.setProperty("--approach-scrub", raw.toFixed(4));
  });

  const onSelectPrinciple = (id: string) => {
    const track = trackRef.current;
    const index = approachPrinciples.findIndex((p) => p.id === id);
    if (index < 0) return;

    if (!track || !scrubbing) {
      setActiveIndex(index);
      return;
    }

    const steps = approachPrinciples.length;
    const travel = Math.max(1, track.offsetHeight - window.innerHeight);
    // Land mid-band so the principle feels settled, not on a knife edge
    const progress = (index + 0.35) / steps;
    const top =
      window.scrollY + track.getBoundingClientRect().top + progress * travel;

    window.scrollTo({ top, behavior: "smooth" });
    setActiveIndex(index);
  };

  useEffect(() => {
    const node = sectionRef.current;
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

  // Desktop / tablet: pin + scrub. Mobile & reduced-motion: natural stack.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncMode = () => {
      setScrubbing(desktop.matches && !reduce.matches);
    };

    syncMode();
    desktop.addEventListener("change", syncMode);
    reduce.addEventListener("change", syncMode);
    return () => {
      desktop.removeEventListener("change", syncMode);
      reduce.removeEventListener("change", syncMode);
    };
  }, []);

  useEffect(() => {
    if (!scrubbing) return;

    let ticking = false;
    let frame = 0;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      frame = requestAnimationFrame(() => {
        syncFromScroll();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    syncFromScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [scrubbing]);

  // Mobile stack: activate by intersection
  useEffect(() => {
    if (scrubbing) return;

    const cards = sectionRef.current?.querySelectorAll<HTMLElement>(
      "[data-approach-card]",
    );
    if (!cards?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleCards = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const id = visibleCards[0]?.target.getAttribute("data-approach-card");
        if (!id) return;
        const index = approachPrinciples.findIndex((p) => p.id === id);
        if (index >= 0) setActiveIndex(index);
      },
      { threshold: [0.35, 0.55, 0.75], rootMargin: "-18% 0px -35% 0px" },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [scrubbing]);

  const trackHeight = scrubbing
    ? `calc(100svh + ${approachPrinciples.length * STEP_VH} * 100svh)`
    : undefined;

  return (
    <section
      ref={sectionRef}
      id="approach"
      aria-labelledby="approach-heading"
      className={`relative isolate ${ready ? "approach-ready" : ""} ${visible ? "is-visible" : ""} ${scrubbing ? "approach-scrubbing" : ""}`}
      style={{ ["--approach-i" as string]: displayIndex }}
    >
      <div
        ref={trackRef}
        className="approach-track relative"
        style={trackHeight ? { height: trackHeight } : undefined}
      >
        <div className="approach-pin paper-match relative z-10 lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:justify-start lg:overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden text-teal-900"
          >
            <svg
              className="absolute top-10 left-[5%] hidden h-36 w-36 text-teal-900/20 lg:block"
              fill="none"
              viewBox="0 0 120 120"
            >
              <path
                className="cred-ink"
                d="M10 10 H48 M10 10 V48"
                pathLength={1}
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.2"
                style={{ animationDelay: "80ms" }}
              />
            </svg>
            <svg
              className="absolute right-[6%] bottom-16 hidden h-28 w-40 text-teal-900/18 lg:block"
              fill="none"
              viewBox="0 0 140 100"
            >
              <path
                className="cred-ink"
                d="M16 78 H96 M96 78 V34"
                pathLength={1}
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.2"
                style={{ animationDelay: "1400ms" }}
              />
            </svg>
          </div>

          <div className="relative z-10 sheet-block flex flex-col gap-10 md:gap-12 lg:gap-10">
            <header className="max-w-[40rem]">
              <p
                className="cred-write font-sketch -rotate-2 text-[1.75rem] leading-none text-teal-700 md:text-[1.95rem]"
                style={{ animationDelay: "60ms" }}
              >
                06 · engineering approach
              </p>
              <h2
                id="approach-heading"
                className="cred-write mt-3 -rotate-1 font-display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[0.92] text-teal-900"
                style={{ animationDelay: "160ms" }}
              >
                How I think about engineering.
              </h2>
              <p
                className="cred-write mt-3 max-w-[30rem] rotate-1 font-sketch text-[1.65rem] leading-snug text-teal-700 md:text-[1.85rem]"
                style={{ animationDelay: "280ms" }}
              >
                understand the problem first — then make the right things work
                well
              </p>
              <p
                className="cred-write mt-4 hidden font-sketch text-[1.4rem] text-teal-500 lg:block"
                style={{ animationDelay: "340ms" }}
              >
                ↓ scroll to walk the path
              </p>
            </header>

            {scrubbing ? (
              <div className="gap-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-8">
                <div
                  className="cred-write lg:col-span-4"
                  style={{ animationDelay: "400ms" }}
                >
                  <ApproachList
                    principles={approachPrinciples}
                    activeId={activeId}
                    visualId={displayPrinciple.id}
                    onSelect={onSelectPrinciple}
                    onHover={setHoverId}
                  />
                </div>

                <div
                  className="cred-write lg:col-span-4"
                  style={{ animationDelay: "520ms" }}
                >
                  <ApproachDetail
                    key={displayPrinciple.id}
                    principle={displayPrinciple}
                    index={displayIndex}
                    total={approachPrinciples.length}
                  />
                </div>

                <div
                  className="cred-write flex justify-end lg:col-span-4"
                  style={{ animationDelay: "640ms" }}
                >
                  <ApproachVisual
                    principles={approachPrinciples}
                    activeIndex={displayIndex}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-10">
                {approachPrinciples.map((principle, index) => (
                  <MobilePrincipleCard
                    key={principle.id}
                    principle={principle}
                    index={index}
                    total={approachPrinciples.length}
                    active={principle.id === activeId}
                  />
                ))}
              </div>
            )}

            {scrubbing ? (
              <p
                aria-live="polite"
                className="sr-only"
              >{`Principle ${activePrinciple.number}: ${activePrinciple.title}`}</p>
            ) : null}
          </div>
        </div>
      </div>

      <aside className="sheet-block sheet-block--continue">
        <div
          className="cred-write max-w-[36rem]"
          style={{ animationDelay: "200ms" }}
        >
          <p className="font-sketch -rotate-1 text-[1.6rem] text-teal-700 md:text-[1.8rem]">
            decisions are contextual
          </p>
          <p className="mt-3 text-[1.1rem] leading-snug text-teal-900/75 md:text-[1.15rem]">
            Tools follow the problem — stage, team, complexity, what already
            exists. Nothing is universally superior.
          </p>
        </div>
      </aside>
    </section>
  );
}

function MobilePrincipleCard({
  principle,
  index,
  total,
  active,
}: {
  principle: ApproachPrinciple;
  index: number;
  total: number;
  active: boolean;
}) {
  return (
    <article
      data-approach-card={principle.id}
      className={`approach-card cred-write ${active ? "is-active" : ""}`}
      style={{ animationDelay: `${400 + index * 100}ms` }}
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-sketch text-[1.25rem] leading-none text-teal-700">
          {principle.number}
        </span>
        <span className="font-sketch text-[1.45rem] text-teal-700/80">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-3 font-display text-[1.35rem] leading-snug tracking-[-0.02em] text-teal-900 md:text-[1.5rem]">
        {principle.title}
      </h3>
      <p className="mt-4 font-sketch text-[1.3rem] leading-snug text-teal-700">
        {principle.philosophy}
      </p>
      <p className="mt-4 text-[1.02rem] leading-relaxed text-teal-900/80">
        {principle.explanation}
      </p>
      <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
        {principle.keywords.map((keyword) => (
          <li
            key={keyword}
            className="font-sketch text-[1.4rem] text-teal-700/80"
          >
            {keyword}
          </li>
        ))}
      </ul>
    </article>
  );
}
