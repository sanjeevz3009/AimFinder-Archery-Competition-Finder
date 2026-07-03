'use client';

import { useEffect, useState, useCallback } from 'react';
import { SpacesRemaining } from '@/components/spaces-remaining';
import { RefreshCw } from 'lucide-react';

type SpacesData = {
  spacesRemaining: number;
  totalSpaces: number;
  updatedAt: string;
};

type Props = {
  slug: string;
  // Initial values from the ISR page - shown immediately, no flash
  initialRemaining: number;
  initialTotal: number;
  // How often to poll in ms. Default 30s
  pollInterval?: number;
};

/**
 * Live availability widget for the competition detail page.
 *
 * Architecture note - this is the "dynamic island" pattern:
 *  - The parent competition page is ISR-cached (fast, SEO-friendly)
 *  - This component fetches /api/spaces/[slug] with no-store on every poll
 *  - Result: static page with genuinely fresh availability data
 *
 * In the next version, /api/spaces/[slug] would query a booking database.
 * For the demo it simulates gradual drift so the number visibly changes.
 */
export function LiveSpaces({
  slug,
  initialRemaining,
  initialTotal,
  pollInterval = 30_000,
}: Props) {
  const [data, setData] = useState<SpacesData>({
    spacesRemaining: initialRemaining,
    totalSpaces: initialTotal,
    updatedAt: new Date().toISOString(),
  });
  const [loading, setLoading] = useState(false);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  const fetchSpaces = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/spaces/${slug}`, {
        // Bypass any browser cache - we always want fresh data
        cache: 'no-store',
      });
      if (res.ok) {
        const json = await res.json();
        setData(json);
        setLastFetched(new Date());
      }
    } catch {
      // Silently fail - keep showing last known value
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    // Fetch immediately on mount
    fetchSpaces();

    // Then poll on interval
    const id = setInterval(fetchSpaces, pollInterval);
    return () => clearInterval(id);
  }, [fetchSpaces, pollInterval]);

  return (
    <div className="space-y-3">
      <SpacesRemaining
        remaining={data.spacesRemaining}
        total={data.totalSpaces}
      />

      {/* Last updated indicator */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <RefreshCw
          className={`h-3 w-3 transition-transform ${loading ? 'animate-spin' : ''}`}
        />
        <span>
          {lastFetched
            ? `Updated ${formatRelative(lastFetched)}`
            : 'Checking availability…'}
        </span>
      </div>
    </div>
  );
}

// Format a Date as "just now", "30s ago", "2m ago" etc
function formatRelative(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 5) return 'just now';
  if (seconds < 60) return `${seconds}s ago`;
  return `${Math.floor(seconds / 60)}m ago`;
}
