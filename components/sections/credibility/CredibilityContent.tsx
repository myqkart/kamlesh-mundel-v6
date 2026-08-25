export function CredibilityContent() {
  return (
    <div className="max-w-[30rem]">
      <p
        className="cred-write font-sketch -rotate-2 text-[1.75rem] leading-none text-teal-700 md:text-[1.95rem]"
        style={{ animationDelay: "80ms" }}
      >
        02 · credibility
      </p>

      <h2
        id="credibility-heading"
        className="cred-write mt-3 -rotate-1 font-display text-[clamp(2.5rem,5vw,4.1rem)] leading-[0.92] text-teal-900"
        style={{ animationDelay: "180ms" }}
      >
        <span className="block">More than code.</span>
        <span className="mt-1 block rotate-1 text-teal-700">
          Built for production.
        </span>
      </h2>

      <p
        className="cred-write mt-4 text-[1.12rem] leading-snug text-teal-900/75 md:text-[1.2rem]"
        style={{ animationDelay: "320ms" }}
      >
        Interfaces, APIs, data, integrations, infra — shipped as one product,
        not a pile of tickets.
      </p>

      <p
        className="cred-write mt-5 max-w-[20rem] rotate-1 font-sketch text-[1.75rem] leading-snug text-teal-700 md:text-[1.95rem]"
        style={{ animationDelay: "460ms" }}
      >
        software that survives contact with reality
      </p>
    </div>
  );
}
