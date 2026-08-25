"use client";

import { useEffect, useRef, useState } from "react";
import { featuredProjects } from "@/data/featured-work";
import { useSectionParallax } from "@/hooks/useSectionParallax";
import { FeaturedProjectItem } from "./FeaturedProjectItem";
import { FeaturedWorkFooter } from "./FeaturedWorkFooter";

export function FeaturedWork() {
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
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="work"
      aria-labelledby="featured-work-heading"
      className={`relative isolate overflow-hidden ${ready ? "work-ready" : ""} ${visible ? "is-visible" : ""}`}
    >
      <div className="relative z-10 sheet-block flex flex-col gap-10 md:gap-12">
        <header className="parallax-slow max-w-[40rem]">
          <p
            className="cred-write font-sketch -rotate-2 text-[1.75rem] leading-none text-teal-700 md:text-[1.95rem]"
            style={{ animationDelay: "80ms" }}
          >
            04 · featured work
          </p>
          <h2
            id="featured-work-heading"
            className="cred-write mt-3 -rotate-1 font-display text-[clamp(2.5rem,5.2vw,4.4rem)] leading-[0.92] text-teal-900"
            style={{ animationDelay: "180ms" }}
          >
            Selected work. Built to solve real problems.
          </h2>
          <p
            className="cred-write mt-4 max-w-[32rem] text-[1.12rem] leading-snug text-teal-900/75 md:text-[1.2rem]"
            style={{ animationDelay: "320ms" }}
          >
            Products &amp; systems where thinking, craft, and shipping meet.
          </p>
        </header>

        <div className="parallax-mid flex flex-col gap-12 md:gap-14 lg:gap-16">
          {featuredProjects.map((project, index) => (
            <div key={project.slug} className="relative">
              {index > 0 ? (
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-7 left-0 hidden h-5 w-28 text-teal-900/35 md:block"
                  fill="none"
                  viewBox="0 0 112 20"
                >
                  <path
                    d="M3 10c18-4 36 3 54-1 20-4 36 5 52 1"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1.4"
                  />
                </svg>
              ) : null}
              <FeaturedProjectItem
                project={project}
                total={featuredProjects.length}
                index={index}
              />
            </div>
          ))}
        </div>

        <div className="parallax-fast">
          <FeaturedWorkFooter />
        </div>
      </div>
    </section>
  );
}
