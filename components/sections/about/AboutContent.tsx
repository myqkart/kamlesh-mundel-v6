export function AboutContent() {
  return (
    <div className="max-w-[42rem]">
      <p
        className="cred-write font-sketch -rotate-2 text-[1.75rem] leading-none text-teal-700 md:text-[1.95rem]"
        style={{ animationDelay: "80ms" }}
      >
        03 · about
      </p>

      <h2
        id="about-heading"
        className="cred-write mt-3 -rotate-1 font-display text-[clamp(2.6rem,5.4vw,4.6rem)] leading-[0.92] text-teal-900"
        style={{ animationDelay: "180ms" }}
      >
        An engineer who cares about the details.
      </h2>

      <p
        className="cred-write mt-4 max-w-[34rem] text-[1.12rem] leading-snug text-teal-900/75 md:text-[1.2rem]"
        style={{ animationDelay: "340ms" }}
      >
        Complex ideas → software that feels simple, runs reliably, and means
        something.
      </p>
    </div>
  );
}
