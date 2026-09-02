import { getPublishedPosts } from "@/lib/blog";
import { absoluteUrl, siteConfig } from "@/lib/site";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function buildRssFeed(): string {
  const posts = getPublishedPosts();
  const buildDate = new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`);
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(`${post.date}T00:00:00.000Z`).toUTCString()}</pubDate>
      <category>${escapeXml(post.category)}</category>
      <author>${escapeXml(post.author)}</author>
    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${siteConfig.name} Blog`)}</title>
    <link>${absoluteUrl("/blog")}</link>
    <description>${escapeXml("Technical writing on full-stack development, Frappe, AWS, and engineering workflows.")}</description>
    <language>${siteConfig.language}</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${absoluteUrl("/rss.xml")}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;
}
