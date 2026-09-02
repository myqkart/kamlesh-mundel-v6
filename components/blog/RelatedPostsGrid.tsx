import type { BlogPost } from "@/lib/blog";
import { BlogEntry } from "./BlogEntry";

interface RelatedPostsGridProps {
  posts: BlogPost[];
  allPosts: BlogPost[];
}

export function RelatedPostsGrid({ posts, allPosts }: RelatedPostsGridProps) {
  if (posts.length === 0) return null;

  const total = allPosts.length;

  return (
    <section aria-labelledby="related-grid-heading" className="blog-related-grid">
      <header className="max-w-[32rem]">
        <p className="font-sketch -rotate-1 text-[1.4rem] text-teal-700">
          from the same notebook
        </p>
        <h2
          id="related-grid-heading"
          className="mt-2 font-display text-[clamp(1.85rem,3.5vw,2.5rem)] leading-tight text-teal-900"
        >
          Continue exploring
        </h2>
      </header>
      <ul className="mt-8 space-y-8">
        {posts.map((post) => {
          const index = allPosts.findIndex((item) => item.slug === post.slug);
          return (
            <li key={post.slug}>
              <BlogEntry post={post} index={index >= 0 ? index : 0} total={total} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
