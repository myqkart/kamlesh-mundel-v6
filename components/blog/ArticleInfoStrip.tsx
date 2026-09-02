import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { formatBlogDate } from "@/lib/blog-format";

interface ArticleInfoStripProps {
  post: BlogPost;
}

export function ArticleInfoStrip({ post }: ArticleInfoStripProps) {
  const cards = [
    { label: "category", value: post.category, href: `/category/${post.categorySlug}` },
    { label: "published", value: formatBlogDate(post.date) },
    { label: "reading", value: post.readingTimeLabel },
    { label: "updated", value: formatBlogDate(post.updated) },
  ] as const;

  return (
    <section aria-label="Article metadata" className="blog-info-strip">
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <li
            key={card.label}
            className="blog-info-card cred-write relative"
            style={{ animationDelay: `${100 + index * 60}ms` }}
          >
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 size-full text-teal-900/28"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <path
                d="M6 8 C 28 5, 70 6, 92 9 C 94 30, 93 70, 90 90 C 66 93, 30 92, 8 88 C 6 62, 6 32, 6 8 Z"
                stroke="currentColor"
                strokeWidth="1.15"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div className="relative z-[1] px-4 py-3">
              <p className="font-sketch text-[1rem] uppercase tracking-wide text-teal-700/70">
                {card.label}
              </p>
              {"href" in card && card.href ? (
                <Link
                  href={card.href}
                  className="mt-0.5 block font-display text-[1.25rem] leading-tight text-teal-900 hover:text-teal-700"
                >
                  {card.value}
                </Link>
              ) : (
                <p className="mt-0.5 font-display text-[1.25rem] leading-tight text-teal-900">
                  {card.value}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>

      {post.tags.length > 0 ? (
        <p className="cred-write mt-4 flex flex-wrap gap-x-3 gap-y-1 font-sketch text-[1.15rem] text-teal-700">
          {post.tags.map((tag, index) => (
            <Link
              key={tag}
              href={`/tag/${post.tagSlugs[index]}`}
              className="hover:text-teal-900 hover:underline"
            >
              [{tag}]
            </Link>
          ))}
        </p>
      ) : null}
    </section>
  );
}
