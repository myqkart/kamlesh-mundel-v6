import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { expertiseCategories } from "@/data/technical-expertise";
import { getCategories, getPublishedPosts, getTags } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/expertise"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const workRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteUrl(`/work/${project.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: project.featured ? 0.85 : 0.75,
  }));

  const expertiseRoutes: MetadataRoute.Sitemap = expertiseCategories.map(
    (category) => ({
      url: absoluteUrl(`/expertise/${category.id}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  const blogRoutes: MetadataRoute.Sitemap = getPublishedPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(`${post.updated}T00:00:00.000Z`),
    changeFrequency: "monthly",
    priority: post.featured ? 0.85 : 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = getCategories().map((category) => ({
    url: absoluteUrl(`/category/${category.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.65,
  }));

  const tagRoutes: MetadataRoute.Sitemap = getTags().map((tag) => ({
    url: absoluteUrl(`/tag/${tag.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...workRoutes,
    ...expertiseRoutes,
    ...blogRoutes,
    ...categoryRoutes,
    ...tagRoutes,
  ];
}
