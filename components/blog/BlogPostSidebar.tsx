import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import type { TocItem } from "@/lib/markdown";
import { formatArticleNumber } from "@/lib/blog-format";
import { TableOfContents } from "./TableOfContents";

interface BlogPostSidebarProps {
  toc: TocItem[];
  related: BlogPost[];
  relatedStartIndex?: number;
}

export function BlogPostSidebar({
  toc,
  related,
  relatedStartIndex = 0,
}: BlogPostSidebarProps) {
  return (
    <aside className="blog-sidebar">
      <div className="blog-sidebar-sticky">
        <TableOfContents items={toc} />

        {related.length > 0 ? (
          <section aria-labelledby="related-posts-heading" className="blog-related">
            <h2
              id="related-posts-heading"
              className="font-sketch text-[1.35rem] text-teal-700"
            >
              continue exploring
            </h2>
            <ul className="mt-4 space-y-4">
              {related.map((post, index) => (
                <li key={post.slug} className="blog-related-item">
                  <p className="font-sketch text-[1.05rem] text-teal-700/60">
                    {formatArticleNumber(relatedStartIndex + index)}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="blog-related-link mt-0.5 block font-display text-[1.25rem] leading-tight text-teal-900"
                  >
                    {post.title}
                  </Link>
                  <p className="mt-1 font-sketch text-[1.05rem] text-teal-700/75">
                    {post.category} · {post.readingTimeLabel}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </aside>
  );
}
