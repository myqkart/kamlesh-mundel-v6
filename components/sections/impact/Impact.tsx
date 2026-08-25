"use client";

import { useEffect, useRef, useState } from "react";
import { impactSignals, impactStories } from "@/data/impact";
import { useSectionParallax } from "@/hooks/useSectionParallax";
import { ImpactBoard } from "./ImpactBoard";

export function Impact() {
  const ref = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);

  useSectionParallax(ref);

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

  return (
    <section
      ref={ref}
      id="impact"
      aria-labelledby="impact-heading"
      className={`relative isolate overflow-x-clip ${ready ? "impact-ready" : ""} ${visible ? "is-visible" : ""}`}
    >
      {/* Margin doodles — unique to this section */}
      <div
        aria-hidden="true"
        className="parallax-mid pointer-events-none absolute inset-0 z-0 overflow-hidden text-teal-900"
      >
        <svg
          className="absolute top-[8%] right-[4%] hidden h-40 w-40 text-teal-900/18 lg:block"
          fill="none"
          viewBox="0 0 120 120"
        >
          <path
            className="cred-ink"
            d="M18 60c20-28 48-28 68 0s-8 52-34 48-50-20-34-48z"
            pathLength={1}
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <text
            x="36"
            y="66"
            fill="currentColor"
            style={{ fontFamily: "var(--font-reenie)", fontSize: "22px" }}
          >
            → change
          </text>
        </svg>
      </div>

      <div className="relative z-10 sheet-block flex flex-col gap-10 md:gap-12">
        {/* Compact banner header — signals as ink stamps across the top */}
        <header className="parallax-slow">
          <p
            className="cred-write font-sketch -rotate-2 text-[1.75rem] leading-none text-teal-700 md:text-[1.95rem]"
            style={{ animationDelay: "60ms" }}
          >
            09 · impact
          </p>
          <div className="mt-3 grid items-end gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <h2
                id="impact-heading"
                className="cred-write -rotate-1 font-display text-[clamp(2.5rem,5.2vw,4.4rem)] leading-[0.9] text-teal-900"
                style={{ animationDelay: "160ms" }}
              >
                Built to make a difference.
              </h2>
              <p
                className="cred-write mt-4 max-w-[28rem] rotate-1 font-sketch text-[1.7rem] leading-snug text-teal-700 md:text-[1.9rem]"
                style={{ animationDelay: "280ms" }}
              >
                not more code — better products, steadier systems, easier
                workflows
              </p>
            </div>

            <ul
              className="cred-write flex flex-wrap gap-x-8 gap-y-4 lg:col-span-5 lg:justify-end"
              style={{ animationDelay: "360ms" }}
            >
              {impactSignals.map((signal, i) => (
                <li
                  key={signal.label}
                  className={`flex flex-col ${i % 2 === 0 ? "-rotate-1" : "rotate-1"}`}
                >
                  <span className="font-display text-[clamp(2rem,3.5vw,2.75rem)] leading-none text-teal-900">
                    {signal.label}
                  </span>
                  <span className="mt-1 max-w-[9rem] font-sketch text-[1.35rem] leading-snug text-teal-700">
                    {signal.detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </header>

        {/* Full-width transformation boards — fills both sides */}
        <div className="parallax-mid flex flex-col gap-14 md:gap-16 lg:gap-20">
          {impactStories.map((story, index) => (
            <ImpactBoard key={story.id} story={story} index={index} />
          ))}
        </div>

        <p
          className="parallax-slow cred-write max-w-[34rem] -rotate-1 font-sketch text-[1.7rem] leading-snug text-teal-700 md:text-[1.9rem]"
          style={{ animationDelay: `${480 + impactStories.length * 120}ms` }}
        >
          Good software reduces friction, enables people, and keeps delivering
          value after the code is written.
        </p>
      </div>
    </section>
  );
}
