import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { formatArticleNumber } from "@/lib/blog-format";
import { BlogMeta } from "./BlogMeta";

interface FeaturedBlogHeroProps {
  post: BlogPost;
  index: number;
  total: number;
}

function FeaturedArrow() {
  return (
    <svg
      aria-hidden="true"
      className="cta-arrow mt-1 size-5 shrink-0 md:size-6"
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

export function FeaturedBlogHero({ post, index, total }: FeaturedBlogHeroProps) {
  return (
    <section aria-labelledby="featured-heading" className="blog-featured">
      <h2
        id="featured-heading"
        className="font-sketch text-[1.35rem] text-teal-700"
      >
        featured article
      </h2>

      <article className="blog-featured-card mt-5">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 lg:col-span-5">
            <p className="font-sketch text-[1.35rem] text-teal-700">
              {formatArticleNumber(index, total)}
            </p>
            <BlogMeta post={post} className="mt-2" />

            <h3 className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[0.92] text-teal-900">
              <Link href={`/blog/${post.slug}`} className="hover:text-teal-700">
                {post.title}
              </Link>
            </h3>

            <p className="mt-4 text-[1.05rem] leading-snug text-teal-900/78 md:text-[1.1rem]">
              {post.description}
            </p>

            {post.tags.length > 0 ? (
              <p className="mt-4 flex flex-wrap gap-x-2 gap-y-1 font-sketch text-[1.1rem] text-teal-700">
                {post.tags.map((tag) => (
                  <span key={tag}>[{tag}]</span>
                ))}
              </p>
            ) : null}

            <Link
              href={`/blog/${post.slug}`}
              className="sketch-cta mt-6 inline-flex font-display text-[1.55rem] leading-none md:text-[1.75rem]"
            >
              <span className="relative pb-1">Read article</span>
              <FeaturedArrow />
            </Link>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <Link
              href={`/blog/${post.slug}`}
              className="blog-featured-cover group relative block aspect-[1200/630] w-full overflow-hidden"
            >
              <Image
                src={post.cover}
                alt={post.coverAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                priority
              />
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
}
