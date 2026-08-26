"use client";

import { useEffect, useRef, useState } from "react";
import { siteFaqs, type FaqItem } from "@/data/seo";
import { useSectionParallax } from "@/hooks/useSectionParallax";

const NOTE_MARKS = [
  "who",
  "stack",
  "place",
  "built",
  "hire",
  "now",
] as const;

/** Sketch interview wall — Q·A notes taped to the sheet (SEO answers stay visible). */
export function FaqSection() {
  const ref = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [openId, setOpenId] = useState<string | null>(siteFaqs[0]?.question ?? null);

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
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="faq"
      aria-labelledby="faq-heading"
      className={`relative isolate overflow-x-clip ${ready ? "faq-ready" : ""} ${visible ? "is-visible" : ""}`}
    >
      <div
        aria-hidden="true"
        className="parallax-mid pointer-events-none absolute inset-0 z-0 overflow-hidden text-teal-900"
      >
        <svg
          className="absolute top-[12%] right-[5%] hidden h-36 w-36 text-teal-900/16 lg:block"
          fill="none"
          viewBox="0 0 120 120"
        >
          <path
            className="cred-ink"
            d="M28 78c8-28 28-44 52-40 18 3 30 22 26 42-3 16-18 28-36 28-22 0-44-12-42-30z"
            pathLength={1}
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <text
            x="48"
            y="72"
            fill="currentColor"
            style={{ fontFamily: "var(--font-reenie)", fontSize: "36px" }}
          >
            ?
          </text>
        </svg>
      </div>

      <div className="relative z-10 sheet-block flex flex-col gap-10 md:gap-12">
        <header className="parallax-slow grid items-end gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="max-w-[40rem] lg:col-span-7">
            <p
              className="cred-write font-sketch -rotate-2 text-[1.75rem] leading-none text-teal-700 md:text-[1.95rem]"
              style={{ animationDelay: "60ms" }}
            >
              questions · answers
            </p>
            <h2
              id="faq-heading"
              className="cred-write mt-3 -rotate-1 font-display text-[clamp(2.5rem,5.2vw,4.4rem)] leading-[0.9] text-teal-900"
              style={{ animationDelay: "160ms" }}
            >
              Straight answers about this work.
            </h2>
            <p
              className="cred-write mt-4 max-w-[28rem] rotate-1 font-sketch text-[1.65rem] leading-snug text-teal-700 md:text-[1.85rem]"
              style={{ animationDelay: "280ms" }}
            >
              an interview taped to the page — ask, then read the ink
            </p>
          </div>

          <aside
            className="cred-write relative max-w-[18rem] lg:col-span-5 lg:justify-self-end"
            style={{ animationDelay: "340ms" }}
          >
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute -inset-2 text-teal-900/20"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <path
                d="M8 16 C 32 6, 68 8, 90 18 C 96 42, 94 70, 86 88 C 58 96, 28 94, 10 82 C 4 56, 4 34, 8 16 Z"
                stroke="currentColor"
                strokeWidth="1.3"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <p className="relative rotate-2 font-sketch text-[1.55rem] leading-none text-teal-700 md:text-[1.7rem]">
              notes on file
            </p>
            <p className="relative mt-2 font-display text-[clamp(2.8rem,5vw,4rem)] leading-none text-teal-900">
              {String(siteFaqs.length).padStart(2, "0")}
            </p>
            <p className="relative mt-2 font-sketch text-[1.35rem] leading-snug text-teal-700/75">
              questions · ready for people &amp; search
            </p>
          </aside>
        </header>

        <dl className="parallax-mid flex flex-col gap-10 md:gap-12 lg:gap-14">
          {siteFaqs.map((faq, index) => (
            <FaqDialogue
              key={faq.question}
              faq={faq}
              index={index}
              mark={NOTE_MARKS[index] ?? `q${index + 1}`}
              active={openId === faq.question}
              onActivate={() => setOpenId(faq.question)}
            />
          ))}
        </dl>

        <p
          className="parallax-slow cred-write max-w-[30rem] -rotate-1 font-sketch text-[1.55rem] leading-snug text-teal-700 md:text-[1.7rem]"
          style={{ animationDelay: `${420 + siteFaqs.length * 80}ms` }}
        >
          still curious? the contact form is the next page in the binder
        </p>
      </div>
    </section>
  );
}

function FaqDialogue({
  faq,
  index,
  mark,
  active,
  onActivate,
}: {
  faq: FaqItem;
  index: number;
  mark: string;
  active: boolean;
  onActivate: () => void;
}) {
  const flip = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");

  return (
    <div
      className={`faq-dialogue cred-write ${active ? "is-active" : ""} ${flip ? "is-flip" : ""}`}
      style={{ animationDelay: `${280 + index * 100}ms` }}
      onMouseEnter={onActivate}
      onFocusCapture={onActivate}
    >
      <div className="grid items-start gap-5 lg:grid-cols-12 lg:gap-8">
        {/* Question plate */}
        <div
          className={`lg:col-span-5 ${flip ? "lg:order-3" : "lg:order-1"}`}
        >
          <dt>
            <button
              type="button"
              className={`faq-q-plate group w-full text-left ${flip ? "rotate-1" : "-rotate-1"}`}
              aria-expanded={active}
              onClick={onActivate}
            >
              <span
                aria-hidden="true"
                className="faq-tape absolute -top-2 left-[18%] h-3 w-11 -rotate-6 bg-teal-300/50"
              />
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 size-full text-teal-900/35"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <path
                  d="M4 7 C 28 2.5, 70 3, 95 7 C 97.5 32, 97 68, 94 92 C 68 96, 30 95, 5.5 91 C 2.5 64, 2.8 34, 4 7 Z"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              <span className="relative z-[1] flex items-baseline justify-between gap-3">
                <span className="font-sketch text-[1.7rem] leading-none text-teal-700 md:text-[1.9rem]">
                  Que. {number}
                </span>
                <span className="font-sketch text-[1.35rem] text-teal-500">
                  [{mark}]
                </span>
              </span>

              <span className="relative z-[1] mt-4 block font-display text-[clamp(1.45rem,2.6vw,1.95rem)] leading-[1.05] text-teal-900">
                {faq.question}
              </span>

              <FaqMark index={index} />
            </button>
          </dt>
        </div>

        {/* Connector — between Q and A on every breakpoint */}
        <div
          aria-hidden="true"
          className={`flex items-center justify-center py-1 lg:col-span-2 lg:py-8 ${flip ? "lg:order-2" : "lg:order-2"}`}
        >
          <svg
            className={`h-8 w-10 text-teal-900/45 lg:hidden`}
            fill="none"
            viewBox="0 0 40 32"
          >
            <path
              className="faq-line"
              d="M20 2 V24"
              pathLength={1}
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              style={{ animationDelay: `${360 + index * 100}ms` }}
            />
            <path
              d="M12 18 l8 8 8 -8"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.4"
            />
          </svg>
          <svg
            className={`hidden h-10 w-full max-w-[7rem] text-teal-900/45 lg:block ${flip ? "-scale-x-100" : ""}`}
            fill="none"
            viewBox="0 0 112 40"
          >
            <path
              className="faq-line"
              d="M4 20c22-4 40 6 56 0s28-4 48 2"
              pathLength={1}
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.6"
              style={{ animationDelay: `${360 + index * 100}ms` }}
            />
            <path
              d="M92 12c6 4 10 8 14 10-5 3-10 6-16 8"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.4"
            />
          </svg>
        </div>

        {/* Answer plate */}
        <div
          className={`lg:col-span-5 ${flip ? "lg:order-1" : "lg:order-3"}`}
        >
          <dd>
            <div
              className={`faq-a-plate ${flip ? "-rotate-1" : "rotate-1"} ${active ? "is-active" : ""}`}
            >
              <span
                aria-hidden="true"
                className="faq-tape absolute -top-2 right-[22%] h-3 w-10 rotate-3 bg-teal-300/40"
              />
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 size-full text-teal-900/30"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <path
                  d="M3.5 8 C 30 3, 72 4, 95.5 8.5 C 98 34, 97.5 70, 94 91.5 C 66 96, 28 95, 5 90 C 2.2 62, 2.5 32, 3.5 8 Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              <p className="relative z-[1] font-sketch text-[1.55rem] leading-none text-teal-700 md:text-[1.7rem]">
                Ans.
              </p>
              <p className="relative z-[1] mt-3 text-[1.05rem] leading-snug text-teal-900/80 md:text-[1.12rem]">
                {faq.answer}
              </p>
            </div>
          </dd>
        </div>
      </div>
    </div>
  );
}

function FaqMark({ index }: { index: number }) {
  return (
    <svg
      aria-hidden="true"
      className="relative z-[1] mt-5 h-10 w-14 text-teal-900/45"
      fill="none"
      viewBox="0 0 56 40"
    >
      {index % 6 === 0 ? (
        <g stroke="currentColor" strokeLinecap="round" strokeWidth="1.5">
          <circle cx="28" cy="12" r="6" />
          <path d="M16 32c2-8 8-12 12-12s10 4 12 12" />
        </g>
      ) : null}
      {index % 6 === 1 ? (
        <g stroke="currentColor" strokeLinecap="round" strokeWidth="1.5">
          <path d="M12 30 H44 V22 H12 Z" />
          <path d="M16 22 V16 H40 V22" />
          <path d="M20 16 V10 H36 V16" />
        </g>
      ) : null}
      {index % 6 === 2 ? (
        <g stroke="currentColor" strokeLinecap="round" strokeWidth="1.5">
          <path d="M28 8c-6 0-10 5-10 11 0 8 10 21 10 21s10-13 10-21c0-6-4-11-10-11z" />
          <circle cx="28" cy="19" r="3.5" />
        </g>
      ) : null}
      {index % 6 === 3 ? (
        <g stroke="currentColor" strokeLinecap="round" strokeWidth="1.5">
          <path d="M10 32 H26 V18 H10 Z" />
          <path d="M30 32 H46 V12 H30 Z" />
        </g>
      ) : null}
      {index % 6 === 4 ? (
        <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
          <path d="M10 28 H34" />
          <path d="M26 18 l12 10 -12 10" />
        </g>
      ) : null}
      {index % 6 === 5 ? (
        <g stroke="currentColor" strokeWidth="1.5">
          <circle cx="28" cy="20" r="11" />
          <circle cx="28" cy="20" r="4" fill="var(--color-teal-300)" />
        </g>
      ) : null}
    </svg>
  );
}
