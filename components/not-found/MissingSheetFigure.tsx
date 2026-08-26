/**
 * Decorative 404 mark — a punched hole where the 0 should be,
 * with a wandering ink path that dead-ends on the sheet.
 * Server-rendered; motion is CSS-only.
 */
export function MissingSheetFigure() {
  return (
    <div aria-hidden="true" className="missing-figure">
      <svg
        className="missing-sketch"
        fill="none"
        viewBox="0 0 640 420"
      >
        <defs>
          <filter id="missing-wobble" x="-8%" y="-8%" width="116%" height="116%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.035"
              numOctaves="2"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="1.6"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        <g
          filter="url(#missing-wobble)"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Notebook corner ticks */}
          <g className="text-teal-900/35">
            <path d="M28 22 H82 M28 22 V76" strokeWidth="1.2" />
            <path d="M592 22 H538 M592 22 V76" strokeWidth="1.2" />
            <path d="M28 392 H82 M28 392 V338" strokeWidth="1.2" />
            <path d="M592 392 H538 M592 392 V338" strokeWidth="1.2" />
          </g>

          {/* Torn edge — a sheet ripped from the binder */}
          <path
            className="ink-draw-slow"
            d="M18 20 C 24 44, 16 68, 26 92 C 14 116, 28 140, 20 164 C 30 188, 16 212, 24 236 C 14 260, 28 284, 19 308 C 29 332, 15 356, 25 380"
            pathLength={1}
            strokeWidth="1.45"
            strokeOpacity="0.45"
          />

          {/* Wandering route that never arrives */}
          <path
            className="missing-wander"
            d="M 64 62 C 104 46, 136 96, 116 132 C 94 168, 62 154, 76 198 C 94 244, 150 228, 176 264 C 210 304, 258 286, 296 312 C 338 340, 390 322, 430 344 C 462 360, 492 340, 516 354"
            strokeWidth="1.7"
          />
          <path
            d="M 64 62 m -5 -5 l 10 10 m 0 -10 l -10 10"
            strokeWidth="1.5"
            strokeOpacity="0.7"
          />

          {/* Dead-end X */}
          <g className="missing-x">
            <path
              className="ink-draw"
              d="M 504 340 l 24 24 m 0 -24 l -24 24"
              pathLength={1}
              strokeWidth="2.2"
              style={{ animationDelay: "1.4s" }}
            />
            <circle
              className="node-pulse"
              cx="516"
              cy="352"
              r="16"
              strokeWidth="1.1"
              strokeOpacity="0.4"
            />
          </g>

          {/* Coffee ring — someone looked for this page a while */}
          <ellipse
            className="ink-draw-slow"
            cx="96"
            cy="300"
            rx="38"
            ry="24"
            pathLength={1}
            strokeWidth="1.15"
            strokeOpacity="0.28"
            style={{ animationDelay: "0.9s" }}
          />
          <ellipse
            cx="98"
            cy="302"
            rx="30"
            ry="18"
            strokeWidth="0.9"
            strokeOpacity="0.16"
          />

          {/* Red-pen teacher mark */}
          <path
            className="missing-note-end ink-draw"
            d="M 418 56 C 448 48, 488 60, 518 52"
            pathLength={1}
            stroke="#c44e48"
            strokeWidth="1.5"
            strokeOpacity="0.7"
            style={{ animationDelay: "1.1s" }}
          />
        </g>

        <text
          x="48"
          y="52"
          fill="currentColor"
          opacity="0.7"
          style={{ fontFamily: "var(--font-reenie)", fontSize: "24px" }}
        >
          you started here
        </text>
        <text
          className="missing-note-end"
          x="560"
          y="50"
          fill="#c44e48"
          opacity="0.8"
          textAnchor="end"
          transform="rotate(-5 560 50)"
          style={{ fontFamily: "var(--font-reenie)", fontSize: "24px" }}
        >
          not in this notebook
        </text>
        <text
          className="missing-note-end"
          x="560"
          y="390"
          fill="currentColor"
          opacity="0.7"
          textAnchor="end"
          style={{ fontFamily: "var(--font-reenie)", fontSize: "20px" }}
        >
          dead end — try the index
        </text>
      </svg>

      <div className="missing-404">
        <span className="missing-four missing-four--left">
          <span className="missing-digit">4</span>
        </span>
        <span className="missing-hole">
          <svg fill="none" viewBox="0 0 160 170">
            <defs>
              <filter id="hole-wobble" x="-12%" y="-12%" width="124%" height="124%">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.06"
                  numOctaves="2"
                  seed="11"
                  result="n"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="n"
                  scale="2.2"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </defs>
            <g filter="url(#hole-wobble)" stroke="currentColor" strokeLinecap="round">
              {/* Void — the missing 0 */}
              <path
                d="M80 18 C 118 14, 144 42, 150 78 C 158 120, 140 150, 108 160 C 74 170, 36 156, 22 122 C 8 86, 18 44, 48 26 C 60 20, 70 18, 80 18 Z"
                fill="rgb(13 92 99 / 0.16)"
                strokeWidth="1.8"
              />
              <path
                className="ink-draw"
                d="M78 38 C 108 34, 126 56, 130 84 C 136 116, 118 140, 92 146 C 64 152, 40 136, 34 108 C 28 78, 42 50, 66 42 C 70 40, 74 38, 78 38 Z"
                fill="rgb(13 92 99 / 0.1)"
                pathLength={1}
                strokeWidth="1.35"
                strokeOpacity="0.7"
              />
              {/* Paper fibers on the tear */}
              <path d="M42 46 l -10 -8" strokeWidth="1.1" strokeOpacity="0.45" />
              <path d="M128 52 l 11 -7" strokeWidth="1.1" strokeOpacity="0.4" />
              <path d="M138 110 l 12 4" strokeWidth="1" strokeOpacity="0.35" />
              <path d="M36 128 l -9 8" strokeWidth="1" strokeOpacity="0.4" />
              <path d="M70 164 l 2 10" strokeWidth="1" strokeOpacity="0.35" />
            </g>
            <text
              x="80"
              y="96"
              textAnchor="middle"
              fill="currentColor"
              opacity="0.55"
              style={{ fontFamily: "var(--font-reenie)", fontSize: "42px" }}
            >
              ?
            </text>
            {/* Scrap that fell through the hole */}
            <g stroke="currentColor" transform="rotate(18 118 148)">
              <path
                d="M104 132 H132 V158 H104 Z"
                fill="var(--paper)"
                strokeWidth="1.15"
                strokeOpacity="0.55"
              />
              <path d="M108 140 H128 M108 146 H122" strokeWidth="0.9" strokeOpacity="0.35" />
            </g>
          </svg>
        </span>
        <span className="missing-four missing-four--right">
          <span className="missing-digit">4</span>
        </span>
      </div>

      <p className="missing-http">
        <span className="hero-reveal" style={{ animationDelay: "700ms" }}>
          HTTP · 404 · sheet missing
        </span>
      </p>
    </div>
  );
}
