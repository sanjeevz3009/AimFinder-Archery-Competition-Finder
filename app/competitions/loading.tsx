import { CompetitionCardSkeleton } from '@/components/loading-skeleton';

export default function CompetitionsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="shrink-0 py-6">
        <div className="h-9 w-48 animate-pulse rounded-lg bg-secondary" />
        <div className="mt-1 h-5 w-72 animate-pulse rounded-lg bg-secondary" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <CompetitionCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
