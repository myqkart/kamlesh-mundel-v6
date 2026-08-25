import { siteFaqs } from "@/data/seo";

/** Visible, answer-ready FAQ — strong for SEO rich results and GEO citations. */
export function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative px-[max(1.85rem,6.5vw)] py-[var(--section-pad-y)] md:px-[7vw]"
    >
      <p className="font-sketch -rotate-2 text-[1.75rem] leading-none text-teal-700 md:text-[1.95rem]">
        questions · answers
      </p>
      <h2
        id="faq-heading"
        className="mt-3 max-w-[18ch] -rotate-1 font-display text-[clamp(2.4rem,5vw,4rem)] leading-[0.92] text-teal-900"
      >
        Straight answers about this work.
      </h2>
      <p className="mt-4 max-w-[36rem] text-[1.08rem] leading-snug text-teal-900/75 md:text-[1.15rem]">
        Clear facts for people — and for search and AI systems that need a
        citable source.
      </p>

      <dl className="mt-10 grid max-w-[48rem] gap-8 md:mt-12 md:gap-10">
        {siteFaqs.map((faq) => (
          <div key={faq.question} className="max-w-[42rem]">
            <dt className="-rotate-[0.4deg] font-display text-[1.55rem] leading-snug text-teal-900 md:text-[1.75rem]">
              {faq.question}
            </dt>
            <dd className="mt-2 text-[1.05rem] leading-snug text-teal-900/80 md:text-[1.1rem]">
              {faq.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
