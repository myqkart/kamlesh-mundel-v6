export function CredibilityDecorations() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden text-teal-900"
    >
      <svg
        className="absolute top-8 left-[4%] hidden h-40 w-40 text-teal-900/25 md:block"
        fill="none"
        viewBox="0 0 120 120"
      >
        <path
          className="cred-ink"
          d="M8 8 H52 M8 8 V52"
          pathLength={1}
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.2"
          style={{ animationDelay: "40ms" }}
        />
      </svg>

      <svg
        className="absolute right-[5%] bottom-10 hidden h-28 w-36 text-teal-900/20 md:block"
        fill="none"
        viewBox="0 0 140 100"
      >
        <path
          className="cred-ink"
          d="M12 72 H88 M88 72 V28"
          pathLength={1}
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.2"
          style={{ animationDelay: "1600ms" }}
        />
      </svg>
    </div>
  );
}
