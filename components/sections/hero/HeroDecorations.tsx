"use client";

import { useEffect, useRef } from "react";

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
          className="hero-sketch absolute top-[18%] right-[-8%] h-[92%] w-[160%] max-w-none text-teal-900 opacity-[0.28] sm:w-[120%] md:top-0 md:right-0 md:h-full md:w-[58%] md:opacity-90"
          fill="none"
          preserveAspectRatio="xMaxYMid slice"
          viewBox="0 0 900 900"
        >
        <defs>
          <filter id="hero-wobble" x="-8%" y="-8%" width="116%" height="116%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.035"
              numOctaves="2"
              seed="4"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2.4"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <filter id="hero-wobble-strong" x="-12%" y="-12%" width="124%" height="124%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.028"
              numOctaves="3"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="3.6"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        <g className="text-teal-900/25" filter="url(#hero-wobble)" stroke="currentColor">
          <path d="M430 40 V860" strokeWidth="1" />
          <path d="M120 310 H880" strokeWidth="1" />
          <path d="M120 70 H210 M120 70 V160" strokeWidth="1.2" />
          <path d="M820 70 H880 M880 70 V160" strokeWidth="1.2" />
          <path d="M120 790 H210 M120 790 V860" strokeWidth="1.2" />
          <circle cx="620" cy="390" r="248" strokeWidth="1" />
          <circle cx="620" cy="390" r="248" strokeDasharray="5 9" strokeWidth="0.6" />
        </g>

        <g filter="url(#hero-wobble-strong)" stroke="currentColor" strokeLinecap="round">
          <path
            className="ink-draw"
            d="M108 286c86-18 148 22 196 74 38 42 58 86 46 128"
            pathLength={1}
            stroke="currentColor"
            strokeOpacity="0.35"
            strokeWidth="1.15"
          />

          <path
            className="ink-draw"
            d="M286 214c72-34 148-28 214 18 58 40 92 108 78 176-12 58-62 104-124 128-54 20-118 8-164-28"
            pathLength={1}
            strokeWidth="1.7"
          />

          <path
            className="ink-draw-slow"
            d="M214 430c90 8 154-36 228-18 70 16 118 72 168 64 62-10 96-78 154-70"
            pathLength={1}
            strokeWidth="2.15"
          />

          <path
            d="M286 214c4-28 22-46 48-52"
            strokeOpacity="0.55"
            strokeWidth="1.2"
          />
          <path
            d="M618 500c28 36 86 58 146 46"
            strokeOpacity="0.55"
            strokeWidth="1.2"
          />
        </g>

        <g filter="url(#hero-wobble)" stroke="currentColor" strokeLinecap="round">
          <path
            d="M338 186c38-4 68 22 72 58 4 38-22 70-58 76-36 6-70-20-76-56-6-34 22-70 62-78z"
            strokeWidth="1.6"
          />
          <path d="M352 192 394 296 M310 244h110" strokeOpacity="0.4" strokeWidth="1" />

          <path
            d="M586 318c42-8 78 18 86 58 8 42-20 80-60 90-42 10-82-16-92-56-10-40 18-80 66-92z"
            strokeWidth="1.8"
          />
          <path d="M604 328 654 454 M548 388h132" strokeOpacity="0.4" strokeWidth="1" />

          <path
            d="M454 486c36-6 66 16 72 50 6 36-16 68-50 76-36 8-70-14-78-48-8-34 16-68 56-78z"
            strokeWidth="1.6"
          />

          <path
            d="M742 548c30-6 54 14 58 42 5 30-14 56-42 62-30 7-56-12-62-40-6-28 14-56 46-64z"
            strokeWidth="1.5"
          />

          <circle cx="214" cy="430" r="7" fill="currentColor" stroke="none" />
          <circle cx="286" cy="214" r="6" fill="currentColor" stroke="none" />
          <circle cx="500" cy="408" r="6" fill="currentColor" stroke="none" />
          <circle cx="618" cy="500" r="6" fill="currentColor" stroke="none" />
          <circle cx="764" cy="430" r="6" fill="currentColor" stroke="none" />

          <circle
            className="node-pulse"
            cx="500"
            cy="408"
            r="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          />
        </g>

        <g
          fill="currentColor"
          opacity="0.72"
          stroke="none"
          style={{ fontFamily: "var(--font-caveat)" }}
        >
          <text x="318" y="168" fontSize="22">
            interface
          </text>
          <text x="572" y="304" fontSize="22">
            systems
          </text>
          <text x="430" y="590" fontSize="22">
            data
          </text>
          <text x="720" y="640" fontSize="22">
            ship
          </text>
        </g>

        <g stroke="currentColor" strokeLinecap="round" opacity="0.4" filter="url(#hero-wobble)">
          <path d="M820 210 V690" strokeWidth="1" />
          <path d="M812 210 H828 M812 690 H828" strokeWidth="1.2" />
          <path d="M812 390 H828" strokeWidth="1.2" />
          <path
            d="M838 226c6 8 4 22-1 34M838 640c4-10 6-22 0-34"
            strokeWidth="1.1"
          />
        </g>
      </svg>
      </div>
    </div>
  );
}
