import Link from "next/link";

interface BlogRssStripProps {
  total: number;
}

export function BlogRssStrip({ total }: BlogRssStripProps) {
  return (
    <section aria-label="Subscribe" className="blog-rss-strip">
      <div className="grid items-center gap-6 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7">
          <p className="font-sketch text-[1.3rem] text-teal-700">stay updated</p>
          <h2 className="mt-2 font-display text-[clamp(1.85rem,3vw,2.5rem)] leading-tight text-teal-900">
            {total} published article{total === 1 ? "" : "s"}
          </h2>
          <p className="mt-3 max-w-[32rem] text-[1.02rem] leading-snug text-teal-900/75">
            Subscribe via RSS for new posts on React, Frappe, AWS, and production
            workflows.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 md:col-span-5 md:justify-end">
          <Link
            href="/rss.xml"
            className="sketch-cta font-display text-[1.4rem] leading-none md:text-[1.55rem]"
          >
            <span className="relative pb-1">RSS feed</span>
          </Link>
          <Link
            href="/#contact"
            className="sketch-cta font-display text-[1.4rem] leading-none text-teal-700 md:text-[1.55rem]"
          >
            <span className="relative pb-1">Discuss a build</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
