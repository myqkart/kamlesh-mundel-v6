"use client";

import { useEffect, useState } from "react";

type SplashPhase = "boot" | "ink" | "name" | "hold" | "exit" | "done";

/**
 * Full-bleed sketchbook splash — ink draws the brand, then the sheet lifts
 * to reveal the portfolio underneath. Plays on every page load.
 */
export function SplashScreen() {
  const [phase, setPhase] = useState<SplashPhase>("boot");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setPhase("done");
      return;
    }

    document.documentElement.classList.add("splash-locked");

    const timers = [
      window.setTimeout(() => setPhase("ink"), 180),
      window.setTimeout(() => setPhase("name"), 720),
      window.setTimeout(() => setPhase("hold"), 1680),
      window.setTimeout(() => setPhase("exit"), 2480),
      window.setTimeout(() => {
        setPhase("done");
        document.documentElement.classList.remove("splash-locked");
      }, 3400),
    ];

    return () => {
      timers.forEach(clearTimeout);
      document.documentElement.classList.remove("splash-locked");
    };
  }, []);

  const skip = () => {
    setPhase("done");
    document.documentElement.classList.remove("splash-locked");
  };

  if (!mounted || phase === "done") return null;

  const active = phase !== "boot";

  return (
    <div
      className={`splash ${active ? `is-${phase}` : "is-boot"}`}
      role="dialog"
      aria-modal="true"
      aria-label="Loading Kamlesh Mundel portfolio"
    >
      <div aria-hidden="true" className="splash-paper" />
      <div aria-hidden="true" className="splash-grain" />
      <div aria-hidden="true" className="splash-margin" />

      {/* Drawn page frame */}
      <svg
        aria-hidden="true"
        className="splash-frame"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <path
          className="splash-ink"
          d="M3 4 C 28 1.8, 72 2.2, 96.5 4 C 98.2 28, 98.4 70, 96 95.5 C 68 97.8, 30 97.4, 3.8 95 C 1.8 68, 1.9 28, 3 4 Z"
          pathLength={1}
          stroke="currentColor"
          strokeWidth="0.45"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="splash-stage">
        <p className="splash-eyebrow font-sketch">opening the sketchbook</p>

        {/* Mini build pipeline — echoes the site metaphor */}
        <svg
          aria-hidden="true"
          className="splash-pipeline"
          fill="none"
          viewBox="0 0 420 56"
        >
          <g stroke="currentColor" strokeLinecap="round">
            <rect
              className="splash-ink"
              x="8"
              y="14"
              width="48"
              height="32"
              strokeWidth="1.5"
              pathLength={1}
            />
            <path
              className="splash-ink"
              d="M64 30 H96"
              pathLength={1}
              strokeWidth="1.4"
              style={{ animationDelay: "120ms" }}
            />
            <path d="M88 24 l10 6 -10 6" strokeWidth="1.3" opacity="0.7" />

            <rect
              className="splash-ink"
              x="104"
              y="10"
              width="72"
              height="40"
              strokeWidth="1.6"
              pathLength={1}
              style={{ animationDelay: "180ms" }}
            />
            <path d="M104 22 H176" strokeWidth="1.1" opacity="0.45" />
            <circle cx="114" cy="16" r="2.2" strokeWidth="1" />
            <circle cx="122" cy="16" r="2.2" strokeWidth="1" />

            <path
              className="splash-ink"
              d="M184 30 H216"
              pathLength={1}
              strokeWidth="1.4"
              style={{ animationDelay: "280ms" }}
            />
            <path d="M208 24 l10 6 -10 6" strokeWidth="1.3" opacity="0.7" />

            <rect
              className="splash-ink"
              x="224"
              y="14"
              width="64"
              height="32"
              strokeWidth="1.5"
              pathLength={1}
              style={{ animationDelay: "340ms" }}
            />
            <path d="M236 26 H268 M236 34 H260" strokeWidth="1.1" opacity="0.45" />

            <path
              className="splash-ink"
              d="M296 30 H328"
              pathLength={1}
              strokeWidth="1.4"
              style={{ animationDelay: "440ms" }}
            />
            <path d="M320 24 l10 6 -10 6" strokeWidth="1.3" opacity="0.7" />

            <ellipse
              className="splash-ink"
              cx="356"
              cy="22"
              rx="28"
              ry="8"
              strokeWidth="1.5"
              pathLength={1}
              style={{ animationDelay: "500ms" }}
            />
            <path d="M328 22 V40" strokeWidth="1.5" />
            <path d="M384 22 V40" strokeWidth="1.5" />
            <ellipse cx="356" cy="40" rx="28" ry="8" strokeWidth="1.5" />

            <path
              className="splash-ink"
              d="M392 30 H404"
              pathLength={1}
              strokeWidth="1.3"
              style={{ animationDelay: "600ms" }}
            />
            <path
              className="splash-ink"
              d="M398 22 l10 10 -14 4"
              pathLength={1}
              strokeWidth="1.7"
              style={{ animationDelay: "680ms" }}
            />
          </g>
        </svg>

        <p className="splash-name font-display">
          <span className="splash-name-line">Kamlesh</span>
          <span className="splash-name-line">Mundel</span>
        </p>

        <svg
          aria-hidden="true"
          className="splash-underline"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 400 18"
        >
          <path
            className="splash-ink"
            d="M4 11c42-5 86 6 128 1 48-6 90 7 136 2 42-4 86 5 128 3"
            pathLength={1}
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2.2"
          />
        </svg>

        <p className="splash-tag font-sketch">
          sr. full stack · ahmedabad · built to move
        </p>

        {/* Progress ink stroke */}
        <div className="splash-progress" aria-hidden="true">
          <span className="splash-progress-fill" />
        </div>
      </div>

      <button type="button" className="splash-skip font-sketch" onClick={skip}>
        skip →
      </button>
    </div>
  );
}
