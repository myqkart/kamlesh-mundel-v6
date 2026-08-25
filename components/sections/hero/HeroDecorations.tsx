"use client";

import { useEffect, useRef } from "react";

/**
 * Hero right-side sketch: a readable product build map —
 * idea → interface → API → data → ship.
 */
export function HeroDecorations() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const onMove = (event: PointerEvent) => {
      const bounds = root.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      root.style.setProperty("--hero-mx", x.toFixed(3));
      root.style.setProperty("--hero-my", y.toFixed(3));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div className="hero-sketch-scroll absolute inset-0">
        <svg
          className="hero-sketch absolute top-[14%] right-[-6%] h-[88%] w-[150%] max-w-none text-teal-900 opacity-[0.32] sm:w-[115%] md:top-[6%] md:right-[1%] md:h-[90%] md:w-[54%] md:opacity-95"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 640 720"
        >
          <defs>
            <filter id="hero-wobble" x="-6%" y="-6%" width="112%" height="112%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.03"
                numOctaves="2"
                seed="3"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="1.8"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>

          <g filter="url(#hero-wobble)" stroke="currentColor" strokeLinecap="round">
            {/* Corner marks — notebook page */}
            <g className="text-teal-900/30">
              <path d="M36 28 H96 M36 28 V88" strokeWidth="1.2" />
              <path d="M604 28 H544 M604 28 V88" strokeWidth="1.2" />
              <path d="M36 692 H96 M36 692 V632" strokeWidth="1.2" />
              <path d="M604 692 H544 M604 692 V632" strokeWidth="1.2" />
            </g>

            {/* Title scribble */}
            <text
              x="120"
              y="58"
              fill="currentColor"
              opacity="0.7"
              style={{ fontFamily: "var(--font-reenie)", fontSize: "26px" }}
            >
              how a product gets built
            </text>

            {/* ── 1. IDEA ── sticky note */}
            <g>
              <path
                className="ink-draw"
                d="M72 110 H168 V198 H72 Z"
                pathLength={1}
                strokeWidth="1.7"
              />
              <path
                d="M86 132 H154 M86 150 H140 M86 168 H148"
                strokeWidth="1.15"
                strokeOpacity="0.4"
              />
              <text
                x="88"
                y="98"
                fill="currentColor"
                style={{ fontFamily: "var(--font-reenie)", fontSize: "22px" }}
              >
                01 idea
              </text>
            </g>

            {/* arrow idea → UI */}
            <path
              className="ink-draw"
              d="M168 154 H230"
              pathLength={1}
              strokeWidth="1.5"
              style={{ animationDelay: "200ms" }}
            />
            <path d="M218 146 l14 8 -14 8" strokeWidth="1.4" />

            {/* ── 2. INTERFACE ── browser window */}
            <g>
              <path
                className="ink-draw"
                d="M236 100 H520 V280 H236 Z"
                pathLength={1}
                strokeWidth="1.85"
                style={{ animationDelay: "280ms" }}
              />
              <path d="M236 128 H520" strokeWidth="1.3" />
              <circle cx="254" cy="114" r="4" strokeWidth="1.1" />
              <circle cx="270" cy="114" r="4" strokeWidth="1.1" />
              <circle cx="286" cy="114" r="4" strokeWidth="1.1" />
              {/* UI blocks inside */}
              <path
                d="M258 150 H380 V210 H258 Z"
                strokeWidth="1.25"
                strokeOpacity="0.55"
              />
              <path
                d="M400 150 H498 V176 H400 Z"
                strokeWidth="1.2"
                strokeOpacity="0.45"
              />
              <path
                d="M400 190 H498 V246 H400 Z"
                strokeWidth="1.2"
                strokeOpacity="0.45"
              />
              <path
                d="M258 226 H380 V256 H258 Z"
                strokeWidth="1.15"
                strokeOpacity="0.4"
              />
              <text
                x="236"
                y="90"
                fill="currentColor"
                style={{ fontFamily: "var(--font-reenie)", fontSize: "22px" }}
              >
                02 interface
              </text>
            </g>

            {/* arrow UI → API */}
            <path
              className="ink-draw"
              d="M378 280 V330"
              pathLength={1}
              strokeWidth="1.55"
              style={{ animationDelay: "480ms" }}
            />
            <path d="M370 318 l8 14 8 -14" strokeWidth="1.4" />

            {/* ── 3. API ── server + endpoints */}
            <g>
              <path
                className="ink-draw"
                d="M250 338 H506 V448 H250 Z"
                pathLength={1}
                strokeWidth="1.8"
                style={{ animationDelay: "560ms" }}
              />
              <path d="M270 368 H380" strokeWidth="1.3" strokeOpacity="0.55" />
              <path d="M270 392 H420" strokeWidth="1.3" strokeOpacity="0.55" />
              <path d="M270 416 H360" strokeWidth="1.3" strokeOpacity="0.55" />
              {/* endpoint pills */}
              <path
                d="M430 360 H488 V380 H430 Z"
                strokeWidth="1.2"
                strokeOpacity="0.5"
              />
              <path
                d="M430 392 H488 V412 H430 Z"
                strokeWidth="1.2"
                strokeOpacity="0.5"
              />
              <text
                x="438"
                y="375"
                fill="currentColor"
                opacity="0.7"
                style={{ fontFamily: "var(--font-reenie)", fontSize: "14px" }}
              >
                GET
              </text>
              <text
                x="436"
                y="407"
                fill="currentColor"
                opacity="0.7"
                style={{ fontFamily: "var(--font-reenie)", fontSize: "14px" }}
              >
                POST
              </text>
              <text
                x="250"
                y="328"
                fill="currentColor"
                style={{ fontFamily: "var(--font-reenie)", fontSize: "22px" }}
              >
                03 api
              </text>
            </g>

            {/* arrow API → Data */}
            <path
              className="ink-draw"
              d="M378 448 V498"
              pathLength={1}
              strokeWidth="1.55"
              style={{ animationDelay: "760ms" }}
            />
            <path d="M370 486 l8 14 8 -14" strokeWidth="1.4" />

            {/* ── 4. DATA ── database cylinder */}
            <g>
              <ellipse
                className="ink-draw"
                cx="378"
                cy="520"
                rx="88"
                ry="22"
                pathLength={1}
                strokeWidth="1.7"
                style={{ animationDelay: "840ms" }}
              />
              <path
                className="ink-draw"
                d="M290 520 V590"
                pathLength={1}
                strokeWidth="1.7"
                style={{ animationDelay: "900ms" }}
              />
              <path
                className="ink-draw"
                d="M466 520 V590"
                pathLength={1}
                strokeWidth="1.7"
                style={{ animationDelay: "900ms" }}
              />
              <ellipse
                cx="378"
                cy="590"
                rx="88"
                ry="22"
                strokeWidth="1.7"
              />
              <ellipse
                cx="378"
                cy="555"
                rx="88"
                ry="18"
                strokeWidth="1.1"
                strokeOpacity="0.35"
                strokeDasharray="4 6"
              />
              <text
                x="290"
                y="508"
                fill="currentColor"
                style={{ fontFamily: "var(--font-reenie)", fontSize: "22px" }}
              >
                04 data
              </text>
            </g>

            {/* arrow Data → Ship */}
            <path
              className="ink-draw"
              d="M466 555 H530"
              pathLength={1}
              strokeWidth="1.55"
              style={{ animationDelay: "1050ms" }}
            />
            <path d="M518 547 l14 8 -14 8" strokeWidth="1.4" />

            {/* ── 5. SHIP ── deploy / production check */}
            <g>
              <path
                className="ink-draw"
                d="M540 500 H610 V610 H540 Z"
                pathLength={1}
                strokeWidth="1.8"
                style={{ animationDelay: "1120ms" }}
              />
              {/* checkmark */}
              <path
                className="ink-draw"
                d="M556 552 l18 18 28 -36"
                pathLength={1}
                strokeWidth="2.1"
                style={{ animationDelay: "1280ms" }}
              />
              <circle
                className="node-pulse"
                cx="575"
                cy="555"
                r="28"
                fill="none"
                strokeWidth="1.1"
                strokeOpacity="0.35"
              />
              <text
                x="540"
                y="490"
                fill="currentColor"
                style={{ fontFamily: "var(--font-reenie)", fontSize: "22px" }}
              >
                05 ship
              </text>
            </g>

            {/* Bottom caption */}
            <text
              x="120"
              y="670"
              fill="currentColor"
              opacity="0.75"
              style={{ fontFamily: "var(--font-reenie)", fontSize: "28px" }}
            >
              idea → product → production
            </text>

            {/* Soft accent nodes */}
            <circle cx="168" cy="154" r="4.5" fill="var(--color-teal-300)" strokeWidth="1.2" />
            <circle cx="378" cy="280" r="4.5" fill="var(--color-off-white)" strokeWidth="1.3" />
            <circle cx="378" cy="448" r="4.5" fill="var(--color-off-white)" strokeWidth="1.3" />
            <circle
              cx="530"
              cy="555"
              r="5.5"
              className="node-pulse"
              fill="var(--color-teal-300)"
              strokeWidth="1.3"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
