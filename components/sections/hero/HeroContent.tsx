function CtaArrow() {
  return (
    <svg
      aria-hidden="true"
      className="cta-arrow mt-1 size-5 shrink-0 md:size-6"
      fill="none"
      viewBox="0 0 24 16"
    >
      <path
        d="M2 9.2c6.2-.8 11.4-.4 16.8.3M14.2 3.2c2.6 1.4 4.4 3.6 5.6 6.2-1.6 1.6-3.7 2.8-6.2 3.4"
        pathLength={1}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function CtaUnderline({ delay }: { delay: string }) {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -bottom-1 h-3 w-full overflow-visible text-teal-700"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 160 12"
    >
      <path
        className="cta-line"
        d="M1 8.2c18-3.4 36 2.2 54-1.1 22-4 38 3.2 62 .4 14-1.8 28 1.4 42 1"
        pathLength={1}
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
        style={{ animationDelay: delay }}
      />
    </svg>
  );
}

export function HeroContent() {
  return (
    <div className="max-w-[36rem]">
      <h1 className="relative mt-0 w-fit max-w-[calc(100vw-3.5rem)] md:max-w-none">
        <span
          className="hero-reveal block font-sketch -rotate-2 text-[1.85rem] leading-none text-teal-700 md:text-[2.1rem]"
          style={{ animationDelay: "80ms" }}
        >
          Sr. Full Stack Developer
        </span>
        <span
          className="hero-reveal hero-name relative mt-3 block w-fit -rotate-1 font-display text-[clamp(3.15rem,13vw,9rem)] font-semibold leading-[0.82] text-teal-900 md:mt-4 md:text-[clamp(4rem,12vw,9rem)]"
          style={{ animationDelay: "180ms" }}
        >
          Kamlesh{" "}
          <span className="block rotate-[0.6deg]">Mundel</span>
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-[0.08em] left-[-2%] h-[0.2em] w-[104%] overflow-visible text-teal-700"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 400 18"
          >
            <path
              className="ink-draw"
              d="M4 11c42-5 86 6 128 1 48-6 90 7 136 2 42-4 86 5 128 3"
              pathLength={1}
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2.4"
            />
          </svg>
        </span>
      </h1>

      <p
        className="hero-reveal mt-4 max-w-[18ch] rotate-[0.4deg] font-display text-[clamp(1.7rem,6.2vw,3.35rem)] leading-[1.08] text-teal-900 md:mt-6 md:text-[clamp(2rem,3.8vw,3.35rem)] md:leading-[1.05]"
        style={{ animationDelay: "380ms" }}
      >
        I build digital products that are designed to move.
      </p>

      <p
        className="hero-reveal mt-3 max-w-[30rem] text-[1.02rem] leading-snug text-teal-900/75 md:mt-4 md:text-[1.2rem]"
        style={{ animationDelay: "520ms" }}
      >
        Full stack across JavaScript, TypeScript &amp; Python — interfaces,
        APIs, data, AWS, and AI integrations that ship.
      </p>

      <div
        className="hero-reveal mt-6 flex flex-wrap items-end gap-x-9 gap-y-4 md:mt-8 md:gap-y-5"
        style={{ animationDelay: "680ms" }}
      >
        <a
          href="#work"
          className="sketch-cta font-display text-[1.55rem] leading-none md:text-[1.95rem]"
        >
          <span className="relative pb-1">
            Explore my work
            <CtaUnderline delay="850ms" />
          </span>
          <CtaArrow />
        </a>
        <a
          href="#contact"
          className="sketch-cta font-display text-[1.55rem] leading-none text-teal-700 md:text-[1.95rem]"
        >
          <span className="relative pb-1">
            Let&apos;s connect
            <CtaUnderline delay="980ms" />
          </span>
          <CtaArrow />
        </a>
      </div>
    </div>
  );
}
