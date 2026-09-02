import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { formatBlogDate } from "@/lib/blog-format";

interface ArticleMetaStripProps {
  post: BlogPost;
}

export function ArticleMetaStrip({ post }: ArticleMetaStripProps) {
  const items = [
    {
      label: "Category",
      value: post.category,
      href: `/category/${post.categorySlug}`,
    },
    { label: "Published", value: formatBlogDate(post.date) },
    { label: "Reading", value: post.readingTimeLabel },
    { label: "Updated", value: formatBlogDate(post.updated) },
  ] as const;

  return (
    <dl className="article-meta-strip">
      {items.map((item) => (
        <div key={item.label} className="article-meta-strip-item">
          <dt className="article-meta-strip-label">{item.label}</dt>
          <dd className="article-meta-strip-value">
            {"href" in item && item.href ? (
              <Link href={item.href} className="hover:text-teal-700 hover:underline">
                {item.value}
              </Link>
            ) : (
              item.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
