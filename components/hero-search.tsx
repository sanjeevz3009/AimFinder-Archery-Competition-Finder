'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { quickFilters } from '@/lib/filters';

// Placeholder texts that cycle in the search input
const PLACEHOLDERS = [
  'London',
  'Sheffield',
  'Bristol',
  'Manchester',
  'Edinburgh',
  'Birmingham',
  'Leeds',
  'Oxford',
];

const TYPE_SPEED = 80; // ms per character typed
const DELETE_SPEED = 45; // ms per character deleted
const PAUSE_AFTER = 1800; // ms to pause on full word before deleting

/**
 * Hero search bar + quick filter chips.
 * The placeholder animates through city names to hint at what to type.
 */
export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Typewriter effect for placeholder
  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      // wordIndex is always kept in range via modulo below
      const current = PLACEHOLDERS[wordIndex]!;

      if (!deleting) {
        // Typing forward
        charIndex++;
        setPlaceholder(current.slice(0, charIndex));

        if (charIndex === current.length) {
          // Finished typing - pause then start deleting
          deleting = true;
          timer = setTimeout(tick, PAUSE_AFTER);
          return;
        }
      } else {
        // Deleting backward
        charIndex--;
        setPlaceholder(current.slice(0, charIndex));

        if (charIndex === 0) {
          // Finished deleting - move to next word
          deleting = false;
          wordIndex = (wordIndex + 1) % PLACEHOLDERS.length;
          timer = setTimeout(tick, 400); // brief pause before typing next
          return;
        }
      }

      timer = setTimeout(tick, deleting ? DELETE_SPEED : TYPE_SPEED);
    };

    // Small initial delay so it starts after the hero fades in
    timer = setTimeout(tick, 1800);
    return () => clearTimeout(timer);
  }, []);

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
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label="Search by city, venue or postcode"
          // Show animated placeholder only when input is empty and not focused
          placeholder={
            isFocused || query
              ? 'Search by city, venue or postcode...'
              : placeholder || 'Search by city, venue or postcode...'
          }
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
