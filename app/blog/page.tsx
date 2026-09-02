import type { Metadata } from "next";
import {
  BlogFilters,
  BlogHeader,
  BlogIndexList,
  BlogIndexShell,
  BlogRssStrip,
  BlogTopicsGrid,
  FeaturedBlogHero,
} from "@/components/blog";
import { SheetDivider } from "@/components/sketch/SheetDivider";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SiteFooter } from "@/components/seo/SiteFooter";
import {
  getCategories,
  getFeaturedPosts,
  getPublishedPostCount,
  getPublishedPosts,
  getTags,
} from "@/lib/blog";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical writing on full-stack development, Frappe, AWS, and engineering workflows by Kamlesh Mundel.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    title: `Blog · ${siteConfig.name}`,
    description:
      "Technical writing on full-stack development, Frappe, AWS, and engineering workflows.",
    url: absoluteUrl("/blog"),
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog · ${siteConfig.name}`,
    description:
      "Technical writing on full-stack development, Frappe, AWS, and engineering workflows.",
  },
};

export default function BlogIndexPage() {
  const posts = getPublishedPosts();
  const total = getPublishedPostCount();
  const featured = getFeaturedPosts();
  const featuredSlugs = new Set(featured.map((post) => post.slug));
  const remainingPosts = posts.filter((post) => !featuredSlugs.has(post.slug));
  const categories = getCategories();
  const tags = getTags();

  const remainingStartIndex = remainingPosts[0]
    ? posts.findIndex((post) => post.slug === remainingPosts[0]!.slug)
    : 0;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />

      <main className="sketch-sheet blog-index">
        <div aria-hidden="true" className="sketch-grain" />
        <div aria-hidden="true" className="sketch-margin" />

        <BlogIndexShell>
          <section className="sheet-block">
            <BlogHeader
              total={total}
              categoryCount={categories.length}
              tagCount={tags.length}
            />
          </section>

          {featured[0] ? (
            <>
              <SheetDivider />
              <section className="sheet-block">
                <FeaturedBlogHero
                  post={featured[0]}
                  index={posts.findIndex((post) => post.slug === featured[0]!.slug)}
                  total={total}
                />
              </section>
            </>
          ) : null}

          <SheetDivider />

          <section className="sheet-block flex flex-col gap-10">
            <BlogFilters categories={categories} tags={tags} />
            <BlogIndexList
              posts={remainingPosts}
              startIndex={remainingStartIndex}
              total={total}
            />
          </section>

          <SheetDivider />

          <section className="sheet-block">
            <BlogTopicsGrid categories={categories} />
          </section>

          <SheetDivider />

          <section className="sheet-block">
            <BlogRssStrip total={total} />
          </section>
        </BlogIndexShell>

        <SiteFooter />
      </main>
    </>
  );
}
