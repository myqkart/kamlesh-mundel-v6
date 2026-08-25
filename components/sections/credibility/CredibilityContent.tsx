export function CredibilityContent() {
  return (
    <div className="max-w-[32rem]">
      <p
        className="cred-write font-sketch -rotate-1 text-[1.3rem] leading-none text-teal-700 md:text-[1.45rem]"
        style={{ animationDelay: "80ms" }}
      >
        02 · credibility
      </p>

      <h2
        id="credibility-heading"
        className="cred-write mt-5 font-display wonk text-[clamp(2.35rem,4.6vw,3.85rem)] leading-[0.96] tracking-[-0.03em] text-teal-900"
        style={{ animationDelay: "180ms" }}
      >
        <span className="block">More than code.</span>
        <span className="mt-1 block text-teal-700">Built for production.</span>
      </h2>

      <p
        className="cred-write mt-6 text-[1.05rem] leading-relaxed text-teal-900/80 md:text-[1.1rem]"
        style={{ animationDelay: "320ms" }}
      >
        I build and ship software across interfaces, APIs, data, integrations,
        and infrastructure, turning complex requirements into reliable digital
        products.
      </p>

      <p
        className="cred-write mt-7 max-w-[22rem] font-sketch text-[1.35rem] leading-snug text-teal-700 md:text-[1.5rem]"
        style={{ animationDelay: "460ms" }}
      >
        Building software that survives contact with reality.
      </p>
    </div>
  );
}
