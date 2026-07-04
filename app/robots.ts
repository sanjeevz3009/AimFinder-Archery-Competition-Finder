import type { MetadataRoute } from 'next';
import { SITE_URL as BASE_URL } from '@/lib/site';

/**
 * Generates robots.txt for AimFinder.
 *
 * Next.js App Router serves this at /robots.txt automatically.
 *
 * Rules:
 * - Allow all crawlers on public content pages
 * - Disallow the AI assistant (personalised, no SEO value)
 * - Disallow internal API routes
 * - Point to the sitemap
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/competitions',
          '/competitions/',
          '/guides',
          '/guides/',
          '/organisers',
          '/about',
        ],
        disallow: ['/api/', '/assistant'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
