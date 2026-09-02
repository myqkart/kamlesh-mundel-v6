import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArticleFooter,
  ArticleHeader,
  ArticleMetaStrip,
  ArticlePageNav,
  ArticleRelatedCards,
  BlogPostBody,
  ReadingProgress,
  TableOfContents,
} from "@/components/blog";
import { SheetDivider } from "@/components/sketch/SheetDivider";
import { BlogPostingJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SiteFooter } from "@/components/seo/SiteFooter";
import {
  getAdjacentPosts,
  getPostBySlug,
  getPostIndex,
  getPublishedPostCount,
  getPublishedPosts,
  getRelatedPosts,
} from "@/lib/blog";
import { renderMarkdown } from "@/lib/markdown";
import { siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    keywords: [...post.tags, post.category, "Kamlesh Mundel", "blog"],
    alternates: { canonical: post.canonical },
    openGraph: {
      type: "article",
      title: `${post.title} · ${siteConfig.name}`,
      description: post.description,
      url: post.canonical,
      images: [{ url: post.cover, alt: post.coverAlt }],
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} · ${siteConfig.name}`,
      description: post.description,
      images: [post.cover],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { html, toc } = await renderMarkdown(post.content);
  const related = getRelatedPosts(post.slug);
  const adjacent = getAdjacentPosts(post.slug);
  const articleIndex = getPostIndex(post.slug);
  const total = getPublishedPostCount();
  const allPosts = getPublishedPosts();

  const relatedStartIndex = related[0]
    ? allPosts.findIndex((item) => item.slug === related[0]!.slug)
    : 0;

  return (
    <>
      <ReadingProgress />
      <BlogPostingJsonLd post={post} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />

      <main className="sketch-sheet blog-article">
        <div aria-hidden="true" className="sketch-grain" />
        <div aria-hidden="true" className="sketch-margin" />

        <article>
          <section className="sheet-block">
            <ArticleHeader post={post} articleIndex={articleIndex} total={total} />
            <ArticleMetaStrip post={post} />
          </section>

          <section className="sheet-block article-body-section">
            <div className="article-body-layout">
              <div className="article-body-main">
                <BlogPostBody html={html} />
                <ArticleFooter author={post.author} />
              </div>

              {toc.length > 0 ? (
                <aside className="article-body-aside" aria-label="Article navigation">
                  <div className="article-toc-card">
                    <TableOfContents items={toc} variant="sidebar" />
                  </div>
                </aside>
              ) : null}
            </div>
          </section>

          <section className="sheet-block article-end-section">
            <ArticlePageNav adjacent={adjacent} />
            <ArticleRelatedCards
              posts={related}
              startIndex={relatedStartIndex >= 0 ? relatedStartIndex : 0}
            />
            <p className="article-cta">
              <Link href="/#contact" className="sketch-cta font-display text-[1.45rem] leading-none">
                Discuss this on a build →
              </Link>
            </p>
          </section>
        </article>

        <SheetDivider />
        <SiteFooter />
      </main>
    </>
  );
}
