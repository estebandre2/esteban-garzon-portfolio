import type { MetadataRoute } from "next";

// Open to every crawler, AI assistants and answer engines included.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://www.estebangarzon.com/sitemap.xml",
    host: "https://www.estebangarzon.com",
  };
}
