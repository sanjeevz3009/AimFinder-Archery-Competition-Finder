import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

// Fonts - loaded via next/font for zero layout shift and self-hosting
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Site-wide metadata - individual pages override title via the template
export const metadata: Metadata = {
  title: {
    default: 'AimFinder - Find Archery Competitions That Match Your Level',
    template: '%s | AimFinder',
  },
  description:
    'Search indoor, outdoor, novice, club and open archery competitions near you - with AI guidance to help you choose the right event.',
  keywords: [
    'archery competitions',
    'archery events UK',
    'indoor archery',
    'outdoor archery',
    'WA18',
    'Portsmouth round',
    'recurve archery',
    'compound archery',
    'barebow',
    'novice archery',
  ],
  authors: [{ name: 'AimFinder' }],
  creator: 'AimFinder',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://aimfinder.vercel.app',
    siteName: 'AimFinder',
    title: 'AimFinder - Find Archery Competitions That Match Your Level',
    description:
      'Search indoor, outdoor, novice, club and open archery competitions near you - with AI guidance to help you choose the right event.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AimFinder - Find Archery Competitions That Match Your Level',
    description:
      'Search indoor, outdoor, novice, club and open archery competitions near you - with AI guidance to help you choose the right event.',
  },
};

export const viewport: Viewport = {
  themeColor: '#0d1117',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} bg-background`}
    >
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />

        {/*
         * Vercel Analytics - tracks page views and Web Vitals.
         * SpeedInsights - reports Core Web Vitals per route.
         * Both are production-only to keep dev logs clean.
         */}
        {process.env.NODE_ENV === 'production' && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}
