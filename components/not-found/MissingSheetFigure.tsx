/**
 * Decorative 404 mark — a punched hole where the 0 should be.
 * One SVG so the path, notes, and numerals stay composed as a unit.
 */
export function MissingSheetFigure() {
  return (
    <div aria-hidden="true" className="missing-figure">
      <svg
        className="missing-sketch"
        fill="none"
        overflow="visible"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 520 290"
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
              scale="1.3"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
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

        <g
          filter="url(#missing-wobble)"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <g className="text-teal-900/30">
            <path d="M58 36 H88 M58 36 V66" strokeWidth="1.15" />
            <path d="M442 36 H412 M442 36 V66" strokeWidth="1.15" />
            <path d="M58 254 H88 M58 254 V224" strokeWidth="1.15" />
            <path d="M442 254 H412 M442 254 V224" strokeWidth="1.15" />
          </g>

          <path
            className="missing-wander"
            d="M 116 64 C 148 40, 162 168, 258 196 C 328 220, 372 182, 408 190"
            strokeWidth="1.65"
          />
          <path
            d="M 116 64 m -5 -5 l 10 10 m 0 -10 l -10 10"
            strokeWidth="1.5"
            strokeOpacity="0.75"
          />

          <g className="missing-x">
            <path
              className="ink-draw"
              d="M 397 179 l 22 22 m 0 -22 l -22 22"
              pathLength={1}
              strokeWidth="2.05"
              style={{ animationDelay: "1.2s" }}
            />
            <circle
              className="node-pulse"
              cx="408"
              cy="190"
              r="13"
              strokeWidth="1.1"
              strokeOpacity="0.4"
            />
          </g>

          <ellipse
            cx="96"
            cy="168"
            rx="22"
            ry="13"
            strokeWidth="1"
            strokeOpacity="0.16"
          />

          <path
            className="ink-draw"
            d="M 358 50 C 386 42, 412 52, 434 44"
            pathLength={1}
            stroke="#c44e48"
            strokeWidth="1.4"
            strokeOpacity="0.72"
            style={{ animationDelay: "1s" }}
          />
        </g>

        <text
          x="130"
          y="56"
          fill="currentColor"
          opacity="0.72"
          style={{ fontFamily: "var(--font-reenie)", fontSize: "20px" }}
        >
          you started here
        </text>
        <text
          x="436"
          y="42"
          fill="#c44e48"
          opacity="0.82"
          textAnchor="end"
          transform="rotate(-4 436 42)"
          style={{ fontFamily: "var(--font-reenie)", fontSize: "20px" }}
        >
          not in this notebook
        </text>

        <g className="missing-404">
          <g transform="rotate(-3.2 138 150)">
            <text
              className="missing-digit"
              x="72"
              y="208"
              fill="currentColor"
              style={{
                animationDelay: "0.22s",
                fontFamily: "var(--font-display), Caveat, cursive",
                fontSize: "176px",
                fontWeight: 600,
              }}
            >
              4
            </text>
          </g>

          <g transform="translate(198 46) scale(0.9)">
            <g className="missing-hole">
              <g
                filter="url(#hole-wobble)"
                stroke="currentColor"
                strokeLinecap="round"
              >
                <path
                  d="M80 18 C 118 14, 144 42, 150 78 C 158 120, 140 150, 108 160 C 74 170, 36 156, 22 122 C 8 86, 18 44, 48 26 C 60 20, 70 18, 80 18 Z"
                  fill="currentColor"
                  fillOpacity="0.16"
                  strokeWidth="1.8"
                />
                <path
                  className="ink-draw"
                  d="M78 38 C 108 34, 126 56, 130 84 C 136 116, 118 140, 92 146 C 64 152, 40 136, 34 108 C 28 78, 42 50, 66 42 C 70 40, 74 38, 78 38 Z"
                  fill="currentColor"
                  fillOpacity="0.1"
                  pathLength={1}
                  strokeWidth="1.35"
                  strokeOpacity="0.7"
                />
                <path d="M42 46 l -8 -6" strokeWidth="1.1" strokeOpacity="0.45" />
                <path d="M128 52 l 9 -5" strokeWidth="1.1" strokeOpacity="0.4" />
                <path d="M136 110 l 9 3" strokeWidth="1" strokeOpacity="0.35" />
              </g>
              <text
                x="80"
                y="96"
                fill="currentColor"
                opacity="0.55"
                textAnchor="middle"
                style={{ fontFamily: "var(--font-reenie)", fontSize: "42px" }}
              >
                ?
              </text>
              <g stroke="currentColor" transform="rotate(16 118 146)">
                <path
                  d="M106 132 H130 V154 H106 Z"
                  fill="var(--paper)"
                  strokeWidth="1.15"
                  strokeOpacity="0.55"
                />
                <path
                  d="M110 140 H126 M110 146 H120"
                  strokeWidth="0.9"
                  strokeOpacity="0.35"
                />
              </g>
            </g>
          </g>

          <g transform="rotate(2.6 378 150)">
            <text
              className="missing-digit"
              x="322"
              y="206"
              fill="currentColor"
              style={{
                animationDelay: "0.48s",
                fontFamily: "var(--font-display), Caveat, cursive",
                fontSize: "176px",
                fontWeight: 600,
              }}
            >
              4
            </text>
          </g>
        </g>

        <g transform="rotate(-1 270 226)">
          <text
            className="missing-http hero-reveal"
            x="270"
            y="226"
            fill="currentColor"
            opacity="0.82"
            textAnchor="middle"
            style={{
              animationDelay: "700ms",
              fontFamily: "var(--font-reenie)",
              fontSize: "21px",
            }}
          >
            HTTP · 404 · sheet missing
          </text>
        </g>
        <text
          x="430"
          y="244"
          fill="currentColor"
          opacity="0.72"
          textAnchor="end"
          style={{ fontFamily: "var(--font-reenie)", fontSize: "18px" }}
        >
          dead end — try the index
        </text>
      </svg>
    </div>
  );
}
