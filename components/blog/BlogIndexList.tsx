import type { BlogPost } from "@/lib/blog";
import { BlogEntry } from "./BlogEntry";

interface BlogIndexListProps {
  posts: BlogPost[];
  startIndex: number;
  total: number;
  title?: string;
  titleId?: string;
}

export function BlogIndexList({
  posts,
  startIndex,
  total,
  title = "All articles",
  titleId = "all-posts-heading",
}: BlogIndexListProps) {
  return (
    <section aria-labelledby={titleId} className="blog-archive-section">
      <header className="blog-section-header">
        <p className="font-sketch text-[1.35rem] text-teal-700">archive</p>
        <h2
          id={titleId}
          className="mt-2 font-display text-[clamp(2rem,3.5vw,2.75rem)] leading-[0.95] text-teal-900"
        >
          {title}
        </h2>
        <p className="mt-3 max-w-[40rem] text-[1.05rem] leading-snug text-teal-900/75">
          {posts.length === 0
            ? "Nothing published here yet."
            : `${posts.length} article${posts.length === 1 ? "" : "s"} on React, Frappe, AWS, and engineering workflows.`}
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="mt-10 font-sketch text-[1.4rem] text-teal-700">
          No articles yet — check back soon.
        </p>
      ) : (
        <ul className="blog-index-list mt-10 divide-y divide-teal-900/10">
          {posts.map((post, offset) => (
            <li key={post.slug} className="py-8 first:pt-0 last:pb-0">
              <BlogEntry post={post} index={startIndex + offset} total={total} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
