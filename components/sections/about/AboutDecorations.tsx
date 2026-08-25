export function AboutDecorations() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden text-teal-900"
    >
      <p
        className="cred-write absolute top-[12%] right-[6%] hidden font-display wonk text-[clamp(3rem,8vw,7rem)] leading-none tracking-[-0.04em] text-teal-900/[0.05] md:block"
        style={{ animationDelay: "400ms" }}
      >
        THINK
      </p>
      <p
        className="cred-write absolute right-[8%] bottom-[18%] hidden font-display wonk text-[clamp(3rem,8vw,7rem)] leading-none tracking-[-0.04em] text-teal-900/[0.05] lg:block"
        style={{ animationDelay: "900ms" }}
      >
        SHIP
      </p>

      <svg
        className="absolute top-10 left-[5%] hidden h-32 w-32 text-teal-900/20 md:block"
        fill="none"
        viewBox="0 0 100 100"
      >
        <path
          className="cred-ink"
          d="M10 10 H44 M10 10 V44"
          pathLength={1}
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.2"
          style={{ animationDelay: "60ms" }}
        />
      </svg>

      <svg
        className="absolute right-[7%] bottom-12 hidden h-24 w-28 text-teal-900/18 md:block"
        fill="none"
        viewBox="0 0 120 90"
      >
        <path
          className="cred-ink"
          d="M14 66 H78 M78 66 V24"
          pathLength={1}
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.2"
          style={{ animationDelay: "1700ms" }}
        />
      </svg>
    </div>
  );
}
