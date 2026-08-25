export function HeroMetadata() {
  return (
    <p
      className="hero-reveal mt-16 flex max-w-[42rem] flex-wrap items-baseline gap-x-3 gap-y-1 font-sketch text-[1.2rem] leading-tight text-teal-700 md:mt-0 md:text-[1.35rem]"
      style={{ animationDelay: "900ms" }}
    >
      <span>Based in India</span>
      <span aria-hidden="true" className="text-teal-300">
        /
      </span>
      <span>4.5+ years experience</span>
      <span aria-hidden="true" className="text-teal-300">
        /
      </span>
      <span>Full Stack Engineering</span>
      <span aria-hidden="true" className="text-teal-300">
        /
      </span>
      <span>MERN · Python</span>
    </p>
  );
}
