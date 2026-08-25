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
    <div className="max-w-[38rem]">
      <p
        className="hero-reveal font-sketch -rotate-1 text-[1.35rem] leading-none text-teal-700 md:text-[1.55rem]"
        style={{ animationDelay: "80ms" }}
      >
        senior full stack engineer · sde-2
      </p>

      <p
        className="hero-reveal relative mt-5 w-fit font-display wonk text-[clamp(3.4rem,10vw,8.25rem)] leading-[0.82] tracking-[-0.045em] text-teal-900"
        style={{ animationDelay: "180ms" }}
      >
        Kamlesh
        <span className="block">Mundel</span>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[0.12em] left-[-2%] h-[0.22em] w-[104%] overflow-visible text-teal-700"
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
            strokeWidth="2.2"
          />
        </svg>
      </p>

      <h1
        className="hero-reveal mt-8 max-w-[22ch] font-sketch text-[clamp(1.85rem,3.4vw,3.15rem)] leading-[1.05] text-teal-900 md:mt-10"
        style={{ animationDelay: "380ms" }}
      >
        I build digital products that are designed to move.
      </h1>

      <p
        className="hero-reveal mt-6 max-w-[34rem] text-[1.05rem] leading-relaxed text-teal-900/80 md:text-[1.12rem]"
        style={{ animationDelay: "560ms" }}
      >
        I&apos;m Kamlesh Mundel, a Senior Full Stack Developer specializing in
        modern JavaScript and Python ecosystems. I build high-quality products
        across frontend, backend, data, and infrastructure.
      </p>

      <div
        className="hero-reveal mt-10 flex flex-wrap items-end gap-x-10 gap-y-6"
        style={{ animationDelay: "720ms" }}
      >
        <a href="#work" className="sketch-cta font-sketch text-[1.55rem] leading-none md:text-[1.75rem]">
          <span className="relative pb-1">
            Explore my work
            <CtaUnderline delay="850ms" />
          </span>
          <CtaArrow />
        </a>
        <a
          href="#contact"
          className="sketch-cta font-sketch text-[1.55rem] leading-none text-teal-700 md:text-[1.75rem]"
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
