import type { BlogPost } from "@/lib/blog";
import { slugify } from "@/lib/blog";

type ArticleSheetDecorProps = {
  post: Pick<BlogPost, "category" | "slug" | "readingTimeLabel">;
};

function FolderTreeDoodle() {
  return (
    <svg
      aria-hidden="true"
      className="h-full w-full"
      fill="none"
      viewBox="0 0 200 280"
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path
          className="ink-draw-slow"
          d="M20 24 H90 V70 H20 Z"
          pathLength={1}
          strokeWidth="1.5"
        />
        <path d="M32 40 H78 M32 52 H68" strokeWidth="1" opacity="0.4" />
        <path
          className="ink-draw"
          d="M34 70 V100 H110 V44 H90"
          pathLength={1}
          strokeWidth="1.4"
          style={{ animationDelay: "200ms" }}
        />
        <path
          className="ink-draw"
          d="M48 100 V130 H140 V58 H110"
          pathLength={1}
          strokeWidth="1.4"
          style={{ animationDelay: "400ms" }}
        />
        <path
          className="ink-draw"
          d="M62 130 V160 H170 V72 H140"
          pathLength={1}
          strokeWidth="1.4"
          style={{ animationDelay: "600ms" }}
        />
        <text
          x="22"
          y="18"
          fill="currentColor"
          style={{ fontFamily: "var(--font-reenie)", fontSize: "16px" }}
        >
          structure
        </text>
      </g>
    </svg>
  );
}

function PipelineDoodle() {
  return (
    <svg aria-hidden="true" className="h-full w-full" fill="none" viewBox="0 0 200 280">
      <g stroke="currentColor" strokeLinecap="round">
        <rect x="24" y="40" width="56" height="40" strokeWidth="1.5" />
        <rect x="108" y="40" width="56" height="40" strokeWidth="1.5" />
        <path d="M80 60 H108" strokeWidth="1.4" />
        <path d="M100 52 l10 8 -10 8" strokeWidth="1.3" />
        <path d="M52 80 V120 H148 V80" strokeWidth="1.3" opacity="0.5" />
        <rect x="60" y="130" width="80" height="50" strokeWidth="1.5" />
        <path d="M100 180 V220" strokeWidth="1.4" />
        <path d="M92 208 l8 12 8 -12" strokeWidth="1.3" />
        <circle cx="100" cy="238" r="14" strokeWidth="1.5" />
        <path d="M94 238 l6 6 10 -12" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

function StickyNoteDoodle() {
  return (
    <svg aria-hidden="true" className="h-full w-full" fill="none" viewBox="0 0 200 280">
      <g stroke="currentColor" strokeLinecap="round">
        <path
          className="ink-draw"
          d="M36 50 H150 V200 H36 Z"
          pathLength={1}
          strokeWidth="1.6"
        />
        <path d="M52 78 H132 M52 98 H118 M52 118 H126 M52 138 H108" strokeWidth="1.1" opacity="0.45" />
        <path
          d="M120 200 L150 170 V200 Z"
          fill="rgb(120 205 215 / 0.2)"
          strokeWidth="1.2"
        />
        <text
          x="48"
          y="38"
          fill="currentColor"
          style={{ fontFamily: "var(--font-reenie)", fontSize: "18px" }}
        >
          field note
        </text>
      </g>
    </svg>
  );
}

function renderCategoryDoodle(category: string) {
  const key = slugify(category);
  if (key.includes("mern") || key.includes("backend") || key.includes("engineering")) {
    return <FolderTreeDoodle />;
  }
  if (key.includes("devops")) {
    return <PipelineDoodle />;
  }
  return <StickyNoteDoodle />;
}

export function ArticleSheetDecor({ post }: ArticleSheetDecorProps) {
  return (
    <div aria-hidden="true" className="blog-article-decor pointer-events-none">
      {/* Right margin — category doodle */}
      <div className="blog-article-decor-doodle text-teal-900/18">
        {renderCategoryDoodle(post.category)}
      </div>

      {/* Top-right annotation */}
      <svg
        className="blog-article-decor-arrow text-teal-700/45"
        fill="none"
        viewBox="0 0 140 60"
      >
        <path
          d="M8 38 H90"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.3"
        />
        <path d="M78 30 l14 8 -14 8" stroke="currentColor" strokeWidth="1.2" />
        <text
          x="8"
          y="22"
          fill="currentColor"
          style={{ fontFamily: "var(--font-reenie)", fontSize: "17px" }}
        >
          {post.readingTimeLabel}
        </text>
      </svg>

      {/* Margin tape */}
      <span className="blog-article-decor-tape" />

      {/* Floating circled check — bottom left of sheet */}
      <svg
        className="blog-article-decor-check text-teal-900/20"
        fill="none"
        viewBox="0 0 80 80"
      >
        <circle cx="40" cy="40" r="28" stroke="currentColor" strokeWidth="1.3" />
        <path
          d="M26 40 l10 10 18 -22"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.6"
        />
      </svg>

      {/* Connector squiggle between columns on wide screens */}
      <svg
        className="blog-article-decor-squiggle text-teal-900/12"
        fill="none"
        viewBox="0 0 40 200"
        preserveAspectRatio="none"
      >
        <path
          d="M20 4c-8 18 10 32 0 50s12 34 0 52 8 38 0 56 10 30 0 38"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
}
