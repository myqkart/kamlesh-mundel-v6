import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { formatBlogDate, formatMetaLine } from "@/lib/blog-format";

interface BlogMetaProps {
  post: Pick<
    BlogPost,
    "category" | "date" | "readingTimeLabel" | "tags" | "tagSlugs" | "author" | "updated"
  >;
  showAuthor?: boolean;
  showTags?: boolean;
  className?: string;
}

export function BlogMeta({
  post,
  showAuthor = false,
  showTags = false,
  className = "",
}: BlogMetaProps) {
  const line = formatMetaLine([
    post.category.toUpperCase(),
    formatBlogDate(post.date),
    post.readingTimeLabel.toUpperCase(),
  ]);

  return (
    <div className={className}>
      <p className="blog-meta-line font-sketch text-[1.2rem] tracking-wide text-teal-700 md:text-[1.3rem]">
        {line}
      </p>
      {showAuthor ? (
        <p className="mt-1 font-sketch text-[1.1rem] text-teal-700/80">
          {post.author}
          {post.updated !== post.date ? (
            <span className="text-teal-700/60"> · updated {formatBlogDate(post.updated)}</span>
          ) : null}
        </p>
      ) : null}
      {showTags && post.tags.length > 0 ? (
        <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-sketch text-[1.15rem] text-teal-700/85">
          {post.tags.map((tag, index) => (
            <Link
              key={tag}
              href={`/tag/${post.tagSlugs[index]}`}
              className="blog-meta-tag hover:text-teal-900"
            >
              [{tag}]
            </Link>
          ))}
        </p>
      ) : null}
    </div>
  );
}
