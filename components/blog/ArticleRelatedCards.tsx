import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { formatArticleNumber } from "@/lib/blog-format";

interface ArticleRelatedCardsProps {
  posts: BlogPost[];
  startIndex?: number;
}

export function ArticleRelatedCards({ posts, startIndex = 0 }: ArticleRelatedCardsProps) {
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="related-articles-heading" className="article-related">
      <header className="article-related-header">
        <p className="font-sketch text-[1.25rem] text-teal-700">keep reading</p>
        <h2
          id="related-articles-heading"
          className="mt-1 font-display text-[clamp(1.75rem,3vw,2.25rem)] leading-tight text-teal-900"
        >
          Related articles
        </h2>
      </header>

      <ul className="article-related-grid">
        {posts.map((post, index) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="article-related-card group">
              <span className="article-related-num">
                {formatArticleNumber(startIndex + index)}
              </span>
              <span className="article-related-category">{post.category}</span>
              <span className="article-related-title">{post.title}</span>
              <span className="article-related-meta">{post.readingTimeLabel}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
