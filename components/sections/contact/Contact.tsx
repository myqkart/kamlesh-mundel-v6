"use client";

import { useEffect, useRef, useState } from "react";
import { contactInfo } from "@/data/contact";
import { useSectionParallax } from "@/hooks/useSectionParallax";
import { ContactForm } from "./ContactForm";

export function Contact() {
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
      id="contact"
      aria-labelledby="contact-heading"
      className={`relative isolate overflow-x-clip ${ready ? "contact-ready" : ""} ${visible ? "is-visible" : ""}`}
    >
      <div
        aria-hidden="true"
        className="parallax-mid pointer-events-none absolute inset-0 z-0 overflow-hidden text-teal-900"
      >
        <svg
          className="absolute top-10 left-[5%] hidden h-36 w-36 text-teal-900/20 lg:block"
          fill="none"
          viewBox="0 0 120 120"
        >
          <path
            className="cred-ink"
            d="M12 12 H52 M12 12 V52"
            pathLength={1}
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.2"
            style={{ animationDelay: "60ms" }}
          />
        </svg>
        <svg
          className="absolute right-[6%] bottom-16 hidden h-[55%] w-[42%] text-teal-900/14 lg:block"
          fill="none"
          viewBox="0 0 420 480"
        >
          <circle
            cx="240"
            cy="220"
            r="150"
            stroke="currentColor"
            strokeDasharray="5 9"
            strokeWidth="0.8"
          />
          <path
            className="cred-ink"
            d="M60 120c70-16 130 28 190 12s110 36 160 18"
            pathLength={1}
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.2"
            style={{ animationDelay: "500ms" }}
          />
          <path
            d="M340 60 H390 M390 60 V110"
            stroke="currentColor"
            strokeWidth="1.1"
          />
        </svg>
      </div>

      <div className="relative z-10 sheet-block flex flex-col gap-10 md:gap-12">
        <header className="max-w-[42rem]">
          <p
            className="cred-write font-sketch -rotate-2 text-[1.75rem] leading-none text-teal-700 md:text-[1.95rem]"
            style={{ animationDelay: "60ms" }}
          >
            10 · contact
          </p>
          <h2
            id="contact-heading"
            className="cred-write mt-3 -rotate-1 font-display text-[clamp(2.35rem,4.8vw,4rem)] leading-[0.92] text-teal-900"
            style={{ animationDelay: "160ms" }}
          >
            Let&apos;s build something useful.
          </h2>
          <p
            className="cred-write mt-4 max-w-[30rem] text-[1.12rem] leading-snug text-teal-900/75 md:text-[1.2rem]"
            style={{ animationDelay: "280ms" }}
          >
            For work, collaboration, or a conversation about product
            engineering — send a note and I&apos;ll get back to you.
          </p>
        </header>

        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="parallax-fast lg:col-span-7">
            <ContactForm />
          </div>

          <aside
            className="parallax-slow cred-write lg:col-span-5 lg:pt-2"
            style={{ animationDelay: "520ms" }}
          >
            <p className="font-sketch -rotate-1 text-[1.55rem] text-teal-700 md:text-[1.7rem]">
              direct
            </p>
            <ul className="mt-5 flex flex-col gap-5">
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="sketch-cta font-sketch text-[1.35rem] text-teal-900 md:text-[1.5rem]"
                >
                  {contactInfo.emailLabel}
                </a>
              </li>
              <li>
                <a
                  href={contactInfo.phoneHref}
                  className="sketch-cta font-sketch text-[1.35rem] text-teal-900 md:text-[1.5rem]"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={contactInfo.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sketch-cta font-sketch text-[1.35rem] text-teal-700 md:text-[1.5rem]"
                >
                  {contactInfo.linkedInLabel}
                </a>
              </li>
              <li className="font-sketch text-[1.25rem] text-teal-700/80 md:text-[1.35rem]">
                {contactInfo.location}
              </li>
            </ul>

            <p className="mt-10 max-w-[24rem] text-[1.02rem] leading-relaxed text-teal-900/70">
              Prefer email? Use the form or write me directly — either works.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
