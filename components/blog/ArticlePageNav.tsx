import Link from "next/link";
import type { BlogAdjacentPosts } from "@/lib/blog";

interface ArticlePageNavProps {
  adjacent: BlogAdjacentPosts;
}

function NavCard({
  label,
  title,
  href,
  direction,
}: {
  label: string;
  title: string;
  href: string;
  direction: "previous" | "next";
}) {
  return (
    <Link
      href={href}
      className={`article-page-nav-card article-page-nav-card--${direction} group`}
    >
      <span className="article-page-nav-label">{label}</span>
      <span className="article-page-nav-title">{title}</span>
      <span className="article-page-nav-arrow" aria-hidden="true">
        {direction === "previous" ? "←" : "→"}
      </span>
    </Link>
  );
}

export function ArticlePageNav({ adjacent }: ArticlePageNavProps) {
  if (!adjacent.previous && !adjacent.next) return null;

  return (
    <nav aria-label="Article navigation" className="article-page-nav">
      {adjacent.previous ? (
        <NavCard
          label="Previous article"
          title={adjacent.previous.title}
          href={`/blog/${adjacent.previous.slug}`}
          direction="previous"
        />
      ) : (
        <div aria-hidden="true" className="hidden sm:block" />
      )}
      {adjacent.next ? (
        <NavCard
          label="Next article"
          title={adjacent.next.title}
          href={`/blog/${adjacent.next.slug}`}
          direction="next"
        />
      ) : null}
    </nav>
  );
}
