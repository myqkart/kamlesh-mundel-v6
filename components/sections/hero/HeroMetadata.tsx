export function HeroMetadata() {
  return (
    <p
      className="hero-reveal mt-12 flex max-w-[42rem] flex-wrap items-baseline gap-x-3 gap-y-1 font-sketch text-[1.55rem] leading-tight text-teal-700 md:mt-0 md:text-[1.75rem]"
      style={{ animationDelay: "900ms" }}
    >
      <span className="-rotate-1">India</span>
      <span aria-hidden="true" className="text-teal-500">
        ·
      </span>
      <span className="rotate-1">available for thoughtful builds</span>
      <span aria-hidden="true" className="text-teal-500">
        ·
      </span>
      <span className="-rotate-1">open to chat</span>
    </p>
  );
}
