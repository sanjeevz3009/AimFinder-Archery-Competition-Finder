'use client';

import { useState, Suspense, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Select, SelectItem } from '@/components/ui/select';

// Filter option constants
const roundTypes = ['WA18', 'Portsmouth', 'WA70', 'Club 252'];
const bowstyles = ['Recurve', 'Compound', 'Barebow', 'Longbow'];
const levels = ['Beginner', 'Novice', 'Club', 'County', 'Open'];
const locations = ['Indoor', 'Outdoor'];

const sortOptions = [
  { value: 'soonest', label: 'Soonest first' },
  { value: 'spaces', label: 'Most spaces' },
  { value: 'beginner', label: 'Beginner friendly first' },
];

// Quick filter chips (homepage hero)
const quickFilters = [
  { label: 'Indoor 18m', params: 'location=Indoor&round=WA18' },
  { label: 'WA18', params: 'round=WA18' },
  { label: 'Portsmouth', params: 'round=Portsmouth' },
  { label: 'Novice friendly', params: 'level=Beginner,Novice' },
  { label: 'Recurve', params: 'bowstyle=Recurve' },
  { label: 'London', params: 'q=London' },
];

// Shared filter form
// instant={true}  -> desktop sidebar: every checkbox/select fires immediately
// instant={false} -> mobile sheet: user picks filters then taps Apply
function FiltersForm({
  instant,
  onApply,
}: {
  instant: boolean;
  onApply?: () => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialise from current URL params so state reflects the active filters
  const [search, setSearch] = useState(searchParams.get('q') ?? '');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up any pending debounce when the component unmounts
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);
  const [selectedRounds, setSelectedRounds] = useState<string[]>(
    searchParams.get('round')?.split(',').filter(Boolean) ?? [],
  );
  const [selectedBowstyles, setSelectedBowstyles] = useState<string[]>(
    searchParams.get('bowstyle')?.split(',').filter(Boolean) ?? [],
  );
  const [selectedLevels, setSelectedLevels] = useState<string[]>(
    searchParams.get('level')?.split(',').filter(Boolean) ?? [],
  );
  const [selectedLocation, setSelectedLocation] = useState<string>(
    searchParams.get('location') ?? '',
  );
  const [sort, setSort] = useState(searchParams.get('sort') ?? 'soonest');

  // Build URLSearchParams from current local state
  const buildParams = (
    overrides: {
      search?: string;
      rounds?: string[];
      bowstyles?: string[];
      levels?: string[];
      location?: string;
      sort?: string;
    } = {},
  ) => {
    const s = overrides.search ?? search;
    const r = overrides.rounds ?? selectedRounds;
    const b = overrides.bowstyles ?? selectedBowstyles;
    const l = overrides.levels ?? selectedLevels;
    const loc = 'location' in overrides ? overrides.location : selectedLocation;
    const srt = overrides.sort ?? sort;

    const p = new URLSearchParams();
    if (s) p.set('q', s);
    if (r.length) p.set('round', r.join(','));
    if (b.length) p.set('bowstyle', b.join(','));
    if (l.length) p.set('level', l.join(','));
    if (loc) p.set('location', loc);
    if (srt && srt !== 'soonest') p.set('sort', srt);
    return p;
  };

  // Push to router - only called directly when instant=true
  const pushNow = (overrides = {}) => {
    const p = buildParams(overrides);
    router.push(`/competitions${p.size ? `?${p}` : ''}`);
  };

  // Apply button handler - used when instant=false (mobile)
  const handleApply = () => {
    pushNow();
    onApply?.();
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedRounds([]);
    setSelectedBowstyles([]);
    setSelectedLevels([]);
    setSelectedLocation('');
    setSort('soonest');
    router.push('/competitions');
    onApply?.();
  };

  const toggleArray = (
    value: string,
    current: string[],
    setter: (v: string[]) => void,
    key: 'rounds' | 'bowstyles' | 'levels',
  ) => {
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setter(next);
    if (instant) pushNow({ [key]: next });
  };

  const hasFilters =
    search ||
    selectedRounds.length > 0 ||
    selectedBowstyles.length > 0 ||
    selectedLevels.length > 0 ||
    selectedLocation;

  return (
    <div className="space-y-6">
      {/* Search
           Desktop (instant=true):  debounces 400ms, fires as user types
           Mobile  (instant=false): fires on Enter or via Apply button     */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search competitions or venues..."
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);
            if (instant) {
              // Debounce - push 400ms after the user stops typing
              if (debounceRef.current) clearTimeout(debounceRef.current);
              debounceRef.current = setTimeout(() => {
                pushNow({ search: value });
              }, 400);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              // Cancel any pending debounce and push immediately
              if (debounceRef.current) clearTimeout(debounceRef.current);
              pushNow({ search: e.currentTarget.value });
              if (!instant) onApply?.();
            }
          }}
          className="h-9 border-border bg-secondary pl-9"
        />
      </div>

      {/* Sort */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Sort by</label>
        <Select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            if (instant) pushNow({ sort: e.target.value });
          }}
          className="border-border bg-secondary"
        >
          {sortOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      {/* Round Type */}
      <FilterGroup label="Round Type">
        {roundTypes.map((round) => (
          <CheckboxRow
            key={round}
            label={round}
            checked={selectedRounds.includes(round)}
            onChange={() =>
              toggleArray(round, selectedRounds, setSelectedRounds, 'rounds')
            }
          />
        ))}
      </FilterGroup>

      {/* Bowstyle */}
      <FilterGroup label="Bowstyle">
        {bowstyles.map((style) => (
          <CheckboxRow
            key={style}
            label={style}
            checked={selectedBowstyles.includes(style)}
            onChange={() =>
              toggleArray(
                style,
                selectedBowstyles,
                setSelectedBowstyles,
                'bowstyles',
              )
            }
          />
        ))}
      </FilterGroup>

      {/* Level */}
      <FilterGroup label="Level">
        {levels.map((level) => (
          <CheckboxRow
            key={level}
            label={level}
            checked={selectedLevels.includes(level)}
            onChange={() =>
              toggleArray(level, selectedLevels, setSelectedLevels, 'levels')
            }
          />
        ))}
      </FilterGroup>

      {/* Venue Type */}
      <FilterGroup label="Venue Type">
        {locations.map((loc) => (
          <CheckboxRow
            key={loc}
            label={loc}
            checked={selectedLocation === loc}
            onChange={() => {
              const next = selectedLocation === loc ? '' : loc;
              setSelectedLocation(next);
              if (instant) pushNow({ location: next });
            }}
          />
        ))}
      </FilterGroup>

      {/* Actions */}
      <div className="space-y-2 border-t border-border pt-4">
        {/* Apply button - mobile only */}
        {!instant && (
          <Button onClick={handleApply} className="w-full">
            <Check className="mr-2 h-4 w-4" />
            Apply Filters
          </Button>
        )}
        {/* Clear - shown when any filter is active */}
        {hasFilters && (
          <Button variant="outline" onClick={clearFilters} className="w-full">
            <X className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}

// Helpers
function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-foreground">{label}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function CheckboxRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <Checkbox checked={checked} onCheckedChange={onChange} />
      <span className="text-sm text-muted-foreground">{label}</span>
    </label>
  );
}

// Public exports
/**
 * Desktop sidebar - instant filtering on every change, no Apply button.
 * Keyed on the search params string so the form remounts when the URL
 * changes externally (e.g. "Clear all filters" from the empty state).
 */
export function CompetitionFilters() {
  return (
    <Suspense
      fallback={
        <div className="space-y-4">
          <div className="h-9 animate-pulse rounded-lg bg-secondary" />
          <div className="h-40 animate-pulse rounded-lg bg-secondary" />
        </div>
      }
    >
      <CompetitionFiltersKeyed instant={true} />
    </Suspense>
  );
}

/** Mobile sheet - Apply button, sheet closes on apply */
export function MobileFilters() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary lg:hidden"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
      </button>
      <SheetContent
        side="left"
        className="w-75 overflow-y-auto bg-background"
        showCloseButton
      >
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="mt-4 px-4 pb-6">
          <Suspense
            fallback={
              <div className="h-40 animate-pulse rounded-lg bg-secondary" />
            }
          >
            <CompetitionFiltersKeyed
              instant={false}
              onApply={() => setOpen(false)}
            />
          </Suspense>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/**
 * Wrapper that reads searchParams and uses them as a key so FiltersForm
 * remounts whenever the URL changes - ensuring local state always reflects
 * the current URL (including when cleared externally).
 */
function CompetitionFiltersKeyed({
  instant,
  onApply,
}: {
  instant: boolean;
  onApply?: () => void;
}) {
  const searchParams = useSearchParams();
  // Only remount when all filters are cleared (empty params = user hit "Clear all")
  // Don't remount on every URL change - that kills input focus mid-typing
  const key = searchParams.toString() === '' ? 'empty' : 'active';
  return <FiltersForm key={key} instant={instant} onApply={onApply} />;
}

/** Quick-filter chips on the homepage hero */
function QuickFiltersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleQuickFilter = (params: string) => {
    const current = new URLSearchParams(searchParams.toString());
    new URLSearchParams(params).forEach((value, key) => {
      current.set(key, value);
    });
    router.push(`/competitions?${current.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {quickFilters.map((filter) => (
        <Badge
          key={filter.label}
          variant="outline"
          className="cursor-pointer px-3 py-1 transition-colors hover:bg-secondary"
          onClick={() => handleQuickFilter(filter.params)}
        >
          {filter.label}
        </Badge>
      ))}
    </div>
  );
}

export function QuickFilters() {
  return (
    <Suspense
      fallback={
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-6 w-20 animate-pulse rounded-full bg-secondary"
            />
          ))}
        </div>
      }
    >
      <QuickFiltersContent />
    </Suspense>
  );
}
