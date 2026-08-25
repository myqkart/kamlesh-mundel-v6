export function AboutContent() {
  return (
    <div className="max-w-[46rem]">
      <p
        className="cred-write font-sketch -rotate-1 text-[1.3rem] leading-none text-teal-700 md:text-[1.45rem]"
        style={{ animationDelay: "80ms" }}
      >
        03 · about
      </p>

      <h2
        id="about-heading"
        className="cred-write mt-5 font-display wonk text-[clamp(2.5rem,5.2vw,4.5rem)] leading-[0.94] tracking-[-0.03em] text-teal-900"
        style={{ animationDelay: "180ms" }}
      >
        An engineer who cares about the details.
      </h2>

      <p
        className="cred-write mt-6 max-w-[36rem] text-[1.05rem] leading-relaxed text-teal-900/80 md:mt-7 md:text-[1.12rem]"
        style={{ animationDelay: "340ms" }}
      >
        I enjoy turning complex ideas into software that feels simple to use,
        reliable to run, and intentional in every detail.
      </p>
    </div>
  );
}
