import Link from "next/link";

interface BlogTopicsGridProps {
  categories: { name: string; slug: string; count: number }[];
}

export function BlogTopicsGrid({ categories }: BlogTopicsGridProps) {
  if (categories.length === 0) return null;

  return (
    <section aria-labelledby="topics-heading" className="blog-topics">
      <header className="blog-section-header">
        <p className="font-sketch text-[1.35rem] text-teal-700">browse</p>
        <h2
          id="topics-heading"
          className="mt-2 font-display text-[clamp(2rem,3.5vw,2.75rem)] leading-[0.95] text-teal-900"
        >
          By category
        </h2>
        <p className="mt-3 max-w-[40rem] text-[1.05rem] leading-snug text-teal-900/75">
          Jump into the topic that matches what you are building.
        </p>
      </header>

      <ul className="blog-topics-grid mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/category/${category.slug}`}
              className="blog-topic-card group block"
            >
              <p className="font-sketch text-[1rem] text-teal-700/70">
                {String(category.count).padStart(2, "0")} articles
              </p>
              <p className="mt-1 font-display text-[1.5rem] leading-tight text-teal-900 group-hover:text-teal-700">
                {category.name}
              </p>
              <p className="mt-3 font-sketch text-[1.05rem] text-teal-700">
                View category →
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
