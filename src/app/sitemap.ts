import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://bluebeakcapital.com";
  const routes = ["", "/challenges", "/competition", "/affiliate", "/faq", "/contact", "/privacy", "/refunds"];
  return routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: r === "" ? 1 : 0.7,
  }));
}
