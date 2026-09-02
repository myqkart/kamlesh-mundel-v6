import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { formatArticleNumber } from "@/lib/blog-format";
import { BlogCoverImage } from "./BlogCoverImage";
import { BlogMeta } from "./BlogMeta";

interface ArticleHeaderProps {
  post: BlogPost;
  articleIndex: number;
  total: number;
}

export function ArticleHeader({ post, articleIndex, total }: ArticleHeaderProps) {
  return (
    <header className="article-hero">
      <div className="article-hero-top">
        <p className="font-sketch text-[1.3rem] text-teal-700">
          <Link href="/blog" className="hover:underline">
            ← Blog
          </Link>
        </p>
        <span className="article-hero-badge font-sketch text-[1.1rem] text-teal-700">
          {formatArticleNumber(articleIndex, total)}
        </span>
      </div>

      {post.draft ? (
        <p
          role="status"
          className="mt-4 inline-block border border-teal-700/40 px-2 py-0.5 font-sketch text-[1.15rem] text-teal-700"
        >
          Draft — visible in development only
        </p>
      ) : null}

      <div className="article-hero-grid mt-8">
        <div className="article-hero-copy">
          <BlogMeta post={post} showAuthor className="mt-1" />

          <h1 className="article-hero-title mt-5 font-display text-[clamp(2.25rem,4.8vw,3.65rem)] leading-[0.92] text-teal-900">
            {post.title}
          </h1>

          <p className="article-hero-desc mt-4 text-[1.1rem] leading-snug text-teal-900/75 md:text-[1.15rem]">
            {post.description}
          </p>

          {post.tags.length > 0 ? (
            <ul className="article-hero-tags mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <li key={tag}>
                  <Link
                    href={`/tag/${post.tagSlugs[index]}`}
                    className="article-hero-tag"
                  >
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="article-hero-visual">
          <BlogCoverImage post={post} priority variant="hero" />
        </div>
      </div>
    </header>
  );
}
