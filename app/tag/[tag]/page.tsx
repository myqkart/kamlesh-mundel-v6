import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BlogFilters,
  BlogIndexList,
  BlogIndexShell,
} from "@/components/blog";
import { SheetDivider } from "@/components/sketch/SheetDivider";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SiteFooter } from "@/components/seo/SiteFooter";
import {
  getCategories,
  getPostsByTag,
  getPublishedPostCount,
  getPublishedPosts,
  getTagBySlug,
  getTags,
} from "@/lib/blog";
import { absoluteUrl, siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ tag: string }>;
};

export function generateStaticParams() {
  return getTags().map((tag) => ({ tag: tag.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag: tagSlug } = await params;
  const tag = getTagBySlug(tagSlug);
  if (!tag) return {};

  const title = `Posts tagged ${tag.name}`;
  const description = `Articles tagged with ${tag.name} by ${siteConfig.name}.`;

  return {
    title,
    description,
    alternates: { canonical: `/tag/${tag.slug}` },
    openGraph: {
      title: `${title} · ${siteConfig.name}`,
      description,
      url: absoluteUrl(`/tag/${tag.slug}`),
    },
    twitter: { card: "summary", title: `${title} · ${siteConfig.name}`, description },
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag: tagSlug } = await params;
  const tag = getTagBySlug(tagSlug);
  if (!tag) notFound();

  const posts = getPostsByTag(tagSlug);
  const allPosts = getPublishedPosts();
  const total = getPublishedPostCount();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: tag.name, path: `/tag/${tag.slug}` },
        ]}
      />

      <main className="sketch-sheet blog-index">
        <div aria-hidden="true" className="sketch-grain" />
        <div aria-hidden="true" className="sketch-margin" />

        <BlogIndexShell>
          <section className="sheet-block">
            <p className="font-sketch text-[1.35rem] text-teal-700">
              <Link href="/blog" className="hover:underline">
                ← Blog
              </Link>
            </p>
            <p className="mt-8 font-sketch text-[1.5rem] text-teal-700">Tag</p>
            <h1 className="mt-3 font-display text-[clamp(2.5rem,5vw,4rem)] leading-[0.92] text-teal-900">
              [{tag.name}]
            </h1>
            <p className="mt-4 max-w-[36rem] text-[1.05rem] leading-snug text-teal-900/75">
              {posts.length} article{posts.length === 1 ? "" : "s"} tagged with {tag.name}.
            </p>
          </section>

          <SheetDivider />

          <section className="sheet-block flex flex-col gap-10">
            <BlogFilters
              categories={getCategories()}
              tags={getTags()}
              activeTag={tag.slug}
            />
            <BlogIndexList
              posts={posts}
              startIndex={posts[0] ? allPosts.findIndex((p) => p.slug === posts[0]!.slug) : 0}
              total={total}
              title={`Tagged ${tag.name}`}
              titleId="tag-posts-heading"
            />
          </section>
        </BlogIndexShell>

        <SiteFooter />
      </main>
    </>
  );
}
