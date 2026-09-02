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
  getCategoryBySlug,
  getPostsByCategory,
  getPublishedPostCount,
  getPublishedPosts,
  getTags,
} from "@/lib/blog";
import { absoluteUrl, siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return getCategories().map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) return {};

  const title = `${category.name} articles`;
  const description = `Articles in ${category.name} by ${siteConfig.name}.`;

  return {
    title,
    description,
    alternates: { canonical: `/category/${category.slug}` },
    openGraph: {
      title: `${title} · ${siteConfig.name}`,
      description,
      url: absoluteUrl(`/category/${category.slug}`),
    },
    twitter: { card: "summary", title: `${title} · ${siteConfig.name}`, description },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const posts = getPostsByCategory(categorySlug);
  const allPosts = getPublishedPosts();
  const total = getPublishedPostCount();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: category.name, path: `/category/${category.slug}` },
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
            <p className="mt-8 font-sketch text-[1.5rem] text-teal-700">Category</p>
            <h1 className="mt-3 font-display text-[clamp(2.5rem,5vw,4rem)] leading-[0.92] text-teal-900">
              {category.name}
            </h1>
            <p className="mt-4 max-w-[36rem] text-[1.05rem] leading-snug text-teal-900/75">
              {posts.length} article{posts.length === 1 ? "" : "s"} in this category.
            </p>
          </section>

          <SheetDivider />

          <section className="sheet-block flex flex-col gap-10">
            <BlogFilters
              categories={getCategories()}
              tags={getTags()}
              activeCategory={category.slug}
            />
            <BlogIndexList
              posts={posts}
              startIndex={posts[0] ? allPosts.findIndex((p) => p.slug === posts[0]!.slug) : 0}
              total={total}
              title={`${category.name} notes`}
              titleId="category-posts-heading"
            />
          </section>
        </BlogIndexShell>

        <SiteFooter />
      </main>
    </>
  );
}
