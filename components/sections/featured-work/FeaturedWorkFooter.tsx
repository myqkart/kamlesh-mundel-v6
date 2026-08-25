"use client";

import { useEffect, useRef, useState } from "react";

function CtaArrow() {
  return (
    <svg
      aria-hidden="true"
      className="cta-arrow mt-1 size-5 shrink-0 md:size-6"
      fill="none"
      viewBox="0 0 24 16"
    >
      <path
        d="M2 9.2c6.2-.8 11.4-.4 16.8.3M14.2 3.2c2.6 1.4 4.4 3.6 5.6 6.2-1.6 1.6-3.7 2.8-6.2 3.4"
        pathLength={1}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function FeaturedWorkFooter() {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);

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
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`pt-1 ${ready ? "project-ready" : ""} ${visible ? "is-visible" : ""}`}
    >
      <svg
        aria-hidden="true"
        className="mb-5 h-3 w-full max-w-[20rem] overflow-visible text-teal-900/35"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 320 12"
      >
        <path
          className="cred-ink"
          d="M1 7c34-4 70 3 104-1 38-4 72 5 110 1 26-3 48 2 70 2"
          pathLength={1}
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.4"
          style={{ animationDelay: "80ms" }}
        />
      </svg>

      <p
        className="cred-write font-sketch text-[1.6rem] text-teal-700 md:text-[1.8rem]"
        style={{ animationDelay: "120ms" }}
      >
        More products, experiments, systems, and engineering explorations.
      </p>
      <a
        href="#all-work"
        className="sketch-cta cred-write mt-5 font-display text-[1.85rem] leading-none md:text-[2.05rem]"
        style={{ animationDelay: "240ms" }}
      >
        <span className="relative pb-1">Explore all work</span>
        <CtaArrow />
      </a>
    </div>
  );
}
