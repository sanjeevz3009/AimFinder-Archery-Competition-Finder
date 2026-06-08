import { Suspense } from 'react';
import type { Metadata } from 'next';
import { competitions } from '@/lib/data';
import { CompetitionCard } from '@/components/competition-card';
import {
  CompetitionFilters,
  MobileFilters,
} from '@/components/competition-filters';
import { CompetitionCardSkeleton } from '@/components/loading-skeleton';
import { EmptyState } from '@/components/empty-state';
import type { Competition } from '@/lib/data';

// SSR - this page is intentionally NOT cached because results depend on
// user-supplied search params. Every request gets fresh, filtered results.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Competitions',
  description:
    'Browse archery competitions near you. Filter by round type, bowstyle, level, and location to find the right event.',
  openGraph: {
    title: 'Archery Competitions | AimFinder',
    description:
      'Browse and filter archery competitions by round type, bowstyle, level, and location.',
  },
};

// Types
type SearchParams = Promise<{
  q?: string;
  round?: string;
  bowstyle?: string;
  level?: string;
  location?: string;
  sort?: string;
}>;

// Filtering logic - pure function that takes search params and returns filtered/sorted competitions
function filterCompetitions(params: Awaited<SearchParams>): Competition[] {
  let filtered = [...competitions];

  // Full-text search across title, venue, city, postcode
  if (params.q) {
    const query = params.q.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.title.toLowerCase().includes(query) ||
        c.venue.toLowerCase().includes(query) ||
        c.city.toLowerCase().includes(query) ||
        c.postcode.toLowerCase().includes(query),
    );
  }

  // Round type - comma-separated: ?round=WA18,Portsmouth
  if (params.round) {
    const rounds = params.round.split(',').map((r) => r.trim());
    filtered = filtered.filter((c) => rounds.includes(c.round));
  }

  // Bowstyle - comma-separated: ?bowstyle=Recurve,Barebow
  if (params.bowstyle) {
    const styles = params.bowstyle.split(',').map((s) => s.trim());
    filtered = filtered.filter((c) =>
      c.bowstyles.some((b) => styles.includes(b)),
    );
  }

  // Level - comma-separated: ?level=Beginner,Novice
  if (params.level) {
    const levels = params.level.split(',').map((l) => l.trim());
    filtered = filtered.filter((c) => levels.includes(c.level));
  }

  // Indoor / Outdoor: ?location=Indoor
  if (params.location) {
    filtered = filtered.filter((c) => c.indoorOutdoor === params.location);
  }

  // Sort
  switch (params.sort) {
    case 'spaces':
      filtered.sort((a, b) => b.spacesRemaining - a.spacesRemaining);
      break;
    case 'beginner':
      filtered.sort((a, b) => {
        if (a.beginnerFriendly && !b.beginnerFriendly) return -1;
        if (!a.beginnerFriendly && b.beginnerFriendly) return 1;
        return 0;
      });
      break;
    case 'soonest':
    default:
      filtered.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
  }

  return filtered;
}

// Results list - async Server Component so it can be wrapped in Suspense
async function CompetitionsList({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const filtered = filterCompetitions(params);

  if (filtered.length === 0) {
    return (
      <EmptyState
        icon="search"
        title="No competitions found"
        description="Try adjusting your filters or search terms to find more competitions."
        action={{ label: 'Clear all filters', href: '/competitions' }}
      />
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {filtered.map((competition) => (
        <CompetitionCard key={competition.slug} competition={competition} />
      ))}
    </div>
  );
}

function CompetitionsListSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <CompetitionCardSkeleton key={i} />
      ))}
    </div>
  );
}

// Page
export default async function CompetitionsPage(props: {
  searchParams: SearchParams;
}) {
  const params = await props.searchParams;
  const hasFilters = Object.keys(params).some(
    (k) => params[k as keyof typeof params],
  );

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Competitions</h1>
          <p className="mt-2 text-muted-foreground">
            Find archery competitions that match your level and preferences
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar - desktop only */}
          <aside className="hidden w-72 flex-shrink-0 lg:block">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-base font-semibold text-foreground">
                Filters
              </h2>
              <CompetitionFilters />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Mobile filter trigger + active filter indicator */}
            <div className="mb-6 flex items-center justify-between lg:hidden">
              <MobileFilters />
              {hasFilters && (
                <span className="text-sm text-muted-foreground">
                  Filters applied
                </span>
              )}
            </div>

            {/*
             * Suspense boundary - shows skeleton while CompetitionsList
             * awaits its async searchParams. The key forces a fresh render
             * whenever the URL changes, preventing stale results.
             */}
            <Suspense
              key={JSON.stringify(params)}
              fallback={<CompetitionsListSkeleton />}
            >
              <CompetitionsList searchParams={props.searchParams} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
