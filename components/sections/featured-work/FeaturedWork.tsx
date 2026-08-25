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
      className={`paper-hero relative isolate overflow-hidden ${ready ? "work-ready" : ""} ${visible ? "is-visible" : ""}`}
    >
      <div className="paper-grain parallax-back opacity-[0.14]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[90rem] flex-col gap-16 px-[7vw] py-[clamp(4.5rem,12vh,8.5rem)] md:gap-20 lg:gap-24">
        <header className="parallax-slow max-w-[44rem]">
          <p
            className="cred-write font-sketch -rotate-1 text-[1.3rem] leading-none text-teal-700 md:text-[1.45rem]"
            style={{ animationDelay: "80ms" }}
          >
            04 · featured work
          </p>
          <h2
            id="featured-work-heading"
            className="cred-write mt-5 font-display wonk text-[clamp(2.4rem,5vw,4.25rem)] leading-[0.95] tracking-[-0.03em] text-teal-900"
            style={{ animationDelay: "180ms" }}
          >
            Selected work. Built to solve real problems.
          </h2>
          <p
            className="cred-write mt-6 max-w-[36rem] text-[1.05rem] leading-relaxed text-teal-900/80 md:text-[1.12rem]"
            style={{ animationDelay: "320ms" }}
          >
            A selection of products and systems where product thinking,
            engineering, and attention to detail come together.
          </p>
        </header>

        <div className="parallax-mid flex flex-col gap-20 md:gap-24 lg:gap-28">
          {featuredProjects.map((project, index) => (
            <div key={project.slug} className="relative">
              {index > 0 ? (
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-12 left-0 hidden h-6 w-24 text-teal-900/30 md:block lg:-top-14"
                  fill="none"
                  viewBox="0 0 96 24"
                >
                  <path
                    d="M4 4v16M4 12h88"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1.2"
                  />
                </svg>
              ) : null}
              <FeaturedProjectItem
                project={project}
                total={featuredProjects.length}
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
