/** Background sketch layer — mirrors AllWork / Credibility decorations. */
export function BlogIndexDecor() {
  return (
    <div
      aria-hidden="true"
      className="parallax-mid pointer-events-none absolute inset-0 z-0 overflow-hidden text-teal-900"
    >
      <svg
        className="absolute top-[8%] right-[4%] hidden h-32 w-40 text-teal-900/14 lg:block"
        fill="none"
        viewBox="0 0 160 120"
      >
        <path
          className="cred-ink"
          d="M20 24 H100 V88 H20 Z"
          pathLength={1}
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <path d="M32 42 H88 M32 58 H76 M32 74 H82" strokeWidth="1" opacity="0.35" />
        <text
          x="24"
          y="18"
          fill="currentColor"
          style={{ fontFamily: "var(--font-reenie)", fontSize: "20px" }}
        >
          notes
        </text>
      </svg>

      <svg
        className="absolute bottom-[12%] left-[3%] hidden h-24 w-32 text-teal-900/12 md:block"
        fill="none"
        viewBox="0 0 128 96"
      >
        <path
          d="M8 48c20-8 40 6 60 0s44 8 52 2"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.4"
        />
        <circle cx="64" cy="48" r="5" fill="var(--color-teal-300)" strokeWidth="1.2" />
      </svg>

      <div className="blog-index-glow absolute top-[20%] left-[55%] hidden h-48 w-48 rounded-full bg-teal-300/10 blur-3xl lg:block" />
      <div className="blog-index-glow absolute right-[15%] bottom-[25%] hidden h-36 w-36 rounded-full bg-teal-500/8 blur-2xl md:block" />
    </div>
  );
}
