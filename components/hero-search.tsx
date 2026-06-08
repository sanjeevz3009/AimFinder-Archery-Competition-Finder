'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const quickFilters = [
  { label: 'Indoor 18m', params: 'location=Indoor&round=WA18' },
  { label: 'WA18', params: 'round=WA18' },
  { label: 'Portsmouth', params: 'round=Portsmouth' },
  { label: 'Novice friendly', params: 'level=Beginner,Novice' },
  { label: 'Recurve', params: 'bowstyle=Recurve' },
  { label: 'London', params: 'q=London' },
];

/**
 * Hero search bar + quick filter chips.
 *
 * Client Component so we can use useRouter to navigate to
 * /competitions with the right search params when the user
 * types a query or clicks a quick filter chip.
 *
 * The homepage itself stays a Server Component / ISR page —
 * only this small interactive island is client-side.
 */
export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    router.push(`/competitions${params.size ? `?${params}` : ''}`);
  };

  const handleQuickFilter = (paramString: string) => {
    router.push(`/competitions?${paramString}`);
  };

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <form onSubmit={handleSearch} className="relative">
        <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by city, venue or postcode..."
          className="h-14 w-full rounded-lg border border-border bg-card pl-12 pr-36 text-base text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 flex cursor-pointer items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Search className="h-4 w-4" />
          Search
        </button>
      </form>

      {/* Quick filter chips */}
      <div>
        <p className="mb-2.5 text-sm text-muted-foreground">
          Popular searches:
        </p>
        <div className="flex flex-wrap gap-2">
          {quickFilters.map((filter) => (
            <Badge
              key={filter.label}
              variant="outline"
              className="cursor-pointer px-3 py-1 text-sm transition-colors hover:bg-secondary hover:text-foreground"
              onClick={() => handleQuickFilter(filter.params)}
            >
              {filter.label}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
