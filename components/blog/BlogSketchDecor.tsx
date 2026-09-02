type SketchFrameProps = {
  className?: string;
};

/** Hand-drawn irregular frame — matches archive-stamp border language. */
export function SketchFrame({ className = "" }: SketchFrameProps) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 size-full text-teal-900/35 ${className}`.trim()}
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <path
        d="M4 6 C 28 2.5, 70 3, 95 6.5 C 97.5 30, 97 68, 94 93 C 68 96.5, 30 96, 5.5 92 C 2.5 66, 2.8 32, 4 6 Z"
        stroke="currentColor"
        strokeWidth="1.25"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function SketchCornerMarks({ className = "" }: SketchFrameProps) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 size-full text-teal-900/25 ${className}`.trim()}
      fill="none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path d="M3 8 H14 M3 8 V19" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M97 8 H86 M97 8 V19" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M3 92 H14 M3 92 V81" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M97 92 H86 M97 92 V81" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

export function SketchAnnotationArrow({ className = "" }: SketchFrameProps) {
  return (
    <svg
      aria-hidden="true"
      className={`text-teal-700/70 ${className}`.trim()}
      fill="none"
      viewBox="0 0 120 48"
    >
      <path
        className="ink-draw"
        d="M4 28 H88"
        pathLength={1}
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M76 18 l16 10 -16 10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
      <text
        x="4"
        y="14"
        fill="currentColor"
        style={{ fontFamily: "var(--font-reenie)", fontSize: "16px" }}
      >
        read this
      </text>
    </svg>
  );
}

export function SketchClosingMark({ className = "" }: SketchFrameProps) {
  return (
    <svg
      aria-hidden="true"
      className={`h-8 w-16 text-teal-700/55 ${className}`.trim()}
      fill="none"
      viewBox="0 0 80 32"
    >
      <path
        d="M8 18c10-4 20 4 32 0 10-3 20 2 32-2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M52 10c4 2 6 6 6 10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.2"
        opacity="0.6"
      />
    </svg>
  );
}

/** Small technical doodle for blog index header. */
export function BlogIndexSketch({ className = "" }: SketchFrameProps) {
  return (
    <svg
      aria-hidden="true"
      className={`text-teal-900/20 ${className}`.trim()}
      fill="none"
      viewBox="0 0 320 200"
    >
      <g stroke="currentColor" strokeLinecap="round">
        <path
          className="ink-draw-slow"
          d="M24 40 H120 V100 H24 Z"
          pathLength={1}
          strokeWidth="1.5"
        />
        <path d="M36 58 H108 M36 72 H92 M36 86 H100" strokeWidth="1" strokeOpacity="0.4" />
        <text
          x="28"
          y="32"
          fill="currentColor"
          style={{ fontFamily: "var(--font-reenie)", fontSize: "18px" }}
        >
          notes
        </text>
        <path
          className="ink-draw"
          d="M120 70 H180"
          pathLength={1}
          strokeWidth="1.4"
          style={{ animationDelay: "400ms" }}
        />
        <path d="M168 62 l14 8 -14 8" strokeWidth="1.3" />
        <path
          className="ink-draw"
          d="M188 28 H290 V160 H188 Z"
          pathLength={1}
          strokeWidth="1.6"
          style={{ animationDelay: "600ms" }}
        />
        <path d="M204 52 H274 M204 72 H250 M204 92 H268 M204 112 H240" strokeWidth="1" strokeOpacity="0.35" />
        <circle cx="274" cy="140" r="10" strokeWidth="1.3" />
        <path d="M268 140 l6 6 10 -12" strokeWidth="1.4" />
      </g>
    </svg>
  );
}
