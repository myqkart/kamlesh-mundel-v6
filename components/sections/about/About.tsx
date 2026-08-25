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
      className={`paper-hero relative isolate overflow-hidden ${ready ? "about-ready" : ""} ${visible ? "is-visible" : ""}`}
    >
      <div className="parallax-mid">
        <AboutDecorations />
      </div>
      <div className="paper-grain parallax-back opacity-[0.14]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[90rem] flex-col gap-16 px-[7vw] py-[clamp(4.5rem,12vh,8.5rem)] md:gap-20 lg:gap-24">
        <div className="parallax-slow">
          <AboutContent />
        </div>

        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="parallax-fast lg:col-span-5">
            <p
              className="cred-write max-w-[34rem] text-[1.08rem] leading-relaxed text-teal-900/80 md:text-[1.15rem]"
              style={{ animationDelay: "520ms" }}
            >
              I like working where product ideas meet engineering constraints. A
              clean interface, a well-designed API, a thoughtful database model,
              and a reliable deployment are all parts of the same product to me.
            </p>
            <p
              className="cred-write mt-8 max-w-[28rem] font-sketch text-[1.45rem] leading-snug text-teal-700 md:text-[1.65rem]"
              style={{ animationDelay: "640ms" }}
            >
              I don&apos;t just build software. I care about how it works, how it
              feels, and why it exists.
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
