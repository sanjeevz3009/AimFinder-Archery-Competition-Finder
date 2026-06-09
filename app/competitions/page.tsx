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
    /*
     * Full-viewport layout:
     * - Outer div is exactly viewport height minus navbar (64px)
     * - overflow-hidden ONLY on the two inner scroll columns, not the wrapper
     *   (putting it on the wrapper clips card shadows and borders)
     * - Sidebar: wider at w-80 so all filter groups fit without truncation
     * - Cards: independent scroll with padding so shadows aren't clipped
     */
    <div
      className="mx-auto flex max-w-7xl flex-col px-4 sm:px-6 lg:px-8"
      style={{ height: 'calc(100vh - 4rem)' }}
    >
      {/* Page header - fixed, never scrolls */}
      <div className="shrink-0 py-6">
        <h1 className="text-3xl font-bold text-foreground">Competitions</h1>
        <p className="mt-1 text-muted-foreground">
          Find archery competitions that match your level and preferences
        </p>
      </div>

      {/* Two-column body - fills remaining height */}
      <div className="flex min-h-0 flex-1 gap-8 pb-6">
        {/* Sidebar - w-80 gives enough room for all filter groups */}
        <aside className="hidden w-80 shrink-0 lg:flex lg:flex-col min-h-0">
          <div className="flex min-h-0 flex-1 flex-col rounded-xl border border-border bg-card">
            {/* Sticky header inside the sidebar */}
            <div className="shrink-0 border-b border-border px-6 py-4">
              <h2 className="text-base font-semibold text-foreground">
                Filters
              </h2>
            </div>
            {/* Scrollable filter content */}
            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
              <CompetitionFilters />
            </div>
          </div>
        </aside>

        {/* Cards column - scrolls independently */}
        <div className="flex min-h-0 flex-1 flex-col">
          {/* Mobile filter trigger */}
          <div className="mb-4 flex shrink-0 items-center justify-between lg:hidden">
            <MobileFilters />
            {hasFilters && (
              <span className="text-sm text-muted-foreground">
                Filters applied
              </span>
            )}
          </div>

          {/*
           * px-1 + negative mx-1 trick: gives card shadows room to render
           * without the scrollbar sitting flush against the cards.
           */}
          <div className="min-h-0 flex-1 overflow-y-auto px-1 pt-2 pb-2">
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
