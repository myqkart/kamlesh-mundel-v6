"use client";

import { useEffect, useRef, useState } from "react";
import { useSectionParallax } from "@/hooks/useSectionParallax";
import { AboutContent } from "./AboutContent";
import { AboutDecorations } from "./AboutDecorations";
import { AboutNarrative } from "./AboutNarrative";
import { AboutPhilosophy } from "./AboutPhilosophy";

export function About() {
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
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="about"
      aria-labelledby="about-heading"
      className={`relative isolate overflow-hidden ${ready ? "about-ready" : ""} ${visible ? "is-visible" : ""}`}
    >
      <div className="parallax-mid">
        <AboutDecorations />
      </div>
      <div className="relative z-10 sheet-block flex flex-col gap-10 md:gap-12">
        <div className="parallax-slow">
          <AboutContent />
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="parallax-fast lg:col-span-5">
            <p
              className="cred-write max-w-[30rem] text-[1.12rem] leading-snug text-teal-900/75 md:text-[1.2rem]"
              style={{ animationDelay: "520ms" }}
            >
              I work where product ideas meet constraints — UI, API, data model,
              and deploy as one product.
            </p>
            <p
              className="cred-write mt-5 max-w-[24rem] rotate-1 font-sketch text-[1.85rem] leading-snug text-teal-700 md:text-[2.1rem]"
              style={{ animationDelay: "640ms" }}
            >
              not just building software — caring how it works, feels, and why
            </p>
          </div>

          <div className="parallax-mid lg:col-span-7">
            <AboutNarrative />
          </div>
        </div>

        <div className="parallax-slow">
          <AboutPhilosophy />
        </div>
      </div>
    </section>
  );
}
