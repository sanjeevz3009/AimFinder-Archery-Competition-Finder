import type { NextConfig } from 'next';

const securityHeaders = [
  // Prevent browsers from guessing MIME types - stops MIME-sniffing attacks
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Prevent the site being embedded in an iframe - stops clickjacking
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  // Control how much referrer info is sent with requests
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Disable browser features the app doesn't use
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  // Enable DNS prefetching for performance
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // Force HTTPS for 2 years (only meaningful in production)
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // Content-Security-Policy - reduces XSS blast radius. Scripts/styles are
  // all same-origin Next.js bundles; connect-src allows Vercel
  // Analytics/Speed Insights (same-origin script, cross-origin reporting).
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // 'unsafe-inline' is required because Next.js injects per-render
      // hydration/streaming scripts inline. A nonce-based CSP would avoid
      // this, but requires calling headers() in the root layout, which
      // forces every route into dynamic rendering - incompatible with the
      // ISR/SSG used on the homepage and competition/guide detail pages.
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self' data:",
      "connect-src 'self' https://vitals.vercel-insights.com https://*.vercel-analytics.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },

  images: {
    remotePatterns: [],
  },

  reactStrictMode: true,
};

export default nextConfig;
