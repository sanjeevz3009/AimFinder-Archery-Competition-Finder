import type { MetadataRoute } from "next";
import { competitions, guides } from "@/lib/data";
import { SITE_URL as BASE_URL } from "@/lib/site";

/**
 * Generates the sitemap for AimFinder.
 *
 * Next.js App Router serves this at /sitemap.xml automatically.
 * Static pages get a weekly changefreq, dynamic content pages daily.
 *
 * In production with a real database, competition pages would revalidate
 * more frequently and lastModified would come from the DB record's updatedAt.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/competitions`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guides`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/organisers`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Competition detail pages
  const competitionRoutes: MetadataRoute.Sitemap = competitions.map((c) => ({
    url: `${BASE_URL}/competitions/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  // Guide detail pages
  const guideRoutes: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${BASE_URL}/guides/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...competitionRoutes, ...guideRoutes];
}
