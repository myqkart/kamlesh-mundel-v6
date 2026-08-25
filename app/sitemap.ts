import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { expertiseCategories } from "@/data/technical-expertise";
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

  return [...staticRoutes, ...workRoutes, ...expertiseRoutes];
}
