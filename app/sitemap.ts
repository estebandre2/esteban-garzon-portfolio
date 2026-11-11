import type { MetadataRoute } from "next";
import { analyticsCaseStudies } from "@/lib/portfolio-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.estebangarzon.com";

  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/code`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/analytics`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...Object.keys(analyticsCaseStudies).map((slug) => ({
      url: `${base}/analytics/cases/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${base}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}
