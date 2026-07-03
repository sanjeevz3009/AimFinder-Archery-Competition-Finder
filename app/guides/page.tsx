import type { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { GuideCard } from '@/components/guide-card';
import { guides } from '@/lib/data';

// SSG + ISR - guide content changes rarely so I pre-render at build time
// and revalidate every 24 hours.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Guides',
  description:
    'Learn about archery round formats before you compete. Guides covering WA18, Portsmouth, WA70, and your first competition.',
};

export default function GuidesPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
              <BookOpen className="h-5 w-5 text-accent" />
            </div>
            <Badge variant="secondary">Resources</Badge>
          </div>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            Archery round guides
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Not sure what a WA18 or Portsmouth round involves? Read our guides
            before you enter - understand the distances, scoring, and what to
            expect on the day.
          </p>
        </div>
      </section>

      {/* Guides grid - uses the same GuideCard component as the rest of the app */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {guides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
