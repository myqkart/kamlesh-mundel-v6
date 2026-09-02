import type { ReactNode } from "react";
import type { BlogPost } from "@/lib/blog";
import { SketchFrame } from "./BlogSketchDecor";

interface ArticleProseFrameProps {
  children: ReactNode;
  post: Pick<BlogPost, "category" | "tags">;
}

/** Wraps article body with notebook margin crafts and section rhythm. */
export function ArticleProseFrame({ children, post }: ArticleProseFrameProps) {
  const primaryTag = post.tags[0] ?? post.category;

  return (
    <div className="blog-prose-frame relative">
      <div aria-hidden="true" className="blog-prose-margin-note blog-prose-margin-note--top">
        <SketchFrame className="opacity-40" />
        <p className="relative z-[1] rotate-[-2deg] font-sketch text-[1.15rem] leading-snug text-teal-700/70">
          ↳ {primaryTag.toLowerCase()}
        </p>
      </div>

      <div aria-hidden="true" className="blog-prose-margin-note blog-prose-margin-note--mid">
        <p className="rotate-1 font-sketch text-[1.05rem] text-teal-700/55">
          read slowly
        </p>
        <svg className="mt-1 h-6 w-12 text-teal-700/40" fill="none" viewBox="0 0 48 24">
          <path
            d="M2 14c8-4 16 2 24-2 8-3 14 2 22 0"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.3"
          />
        </svg>
      </div>

      {children}
    </div>
  );
}
