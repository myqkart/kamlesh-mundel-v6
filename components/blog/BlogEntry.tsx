import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { formatArticleNumber } from "@/lib/blog-format";
import { BlogMeta } from "./BlogMeta";

function EntryArrow() {
  return (
    <svg
      aria-hidden="true"
      className="blog-entry-arrow mt-0.5 size-5 shrink-0 text-teal-700"
      fill="none"
      viewBox="0 0 24 16"
    >
      <path
        d="M2 9.2c6.2-.8 11.4-.4 16.8.3M14.2 3.2c2.6 1.4 4.4 3.6 5.6 6.2-1.6 1.6-3.7 2.8-6.2 3.4"
        pathLength={1}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

interface BlogEntryProps {
  post: BlogPost;
  index: number;
  total: number;
}

export function BlogEntry({ post, index, total }: BlogEntryProps) {
  return (
    <article className="blog-entry-card">
      <Link href={`/blog/${post.slug}`} className="blog-entry-link group">
        <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="min-w-0 lg:col-span-7">
            <div className="flex items-start justify-between gap-4">
              <BlogMeta post={post} className="min-w-0" />
              <span className="shrink-0 font-sketch text-[1.1rem] text-teal-700/55">
                {formatArticleNumber(index, total)}
              </span>
            </div>

            <h2 className="blog-entry-title mt-3 font-display text-[clamp(1.75rem,3vw,2.35rem)] leading-[0.95] text-teal-900">
              {post.title}
            </h2>

            <p className="mt-3 text-[1.02rem] leading-snug text-teal-900/78 md:text-[1.06rem]">
              {post.description}
            </p>

            {post.tags.length > 0 ? (
              <p className="mt-4 flex flex-wrap gap-x-2.5 gap-y-1">
                {post.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="font-sketch text-[1.1rem] text-teal-700/80"
                  >
                    [{tag}]
                  </span>
                ))}
              </p>
            ) : null}

            <span className="blog-entry-cta mt-5 inline-flex items-center gap-2 font-sketch text-[1.3rem] text-teal-900">
              Read article
              <EntryArrow />
            </span>
          </div>

          <div className="min-w-0 lg:col-span-5">
            <div className="blog-entry-cover relative aspect-[1200/630] w-full overflow-hidden">
              <Image
                src={post.cover}
                alt={post.coverAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 28rem"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>

        {post.draft ? (
          <span className="absolute top-4 left-4 font-sketch text-[1.05rem] text-teal-700">
            draft
          </span>
        ) : null}
      </Link>
    </article>
  );
}

/** @deprecated Use BlogEntry — kept for gradual migration */
export function BlogCard({ post, index = 0, total = 1 }: BlogEntryProps) {
  return <BlogEntry post={post} index={index} total={total} />;
}
