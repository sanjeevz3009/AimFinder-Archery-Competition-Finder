'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X } from 'lucide-react';
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
import { cn } from '@/lib/utils';

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

// Quick filter chips shown on the homepage hero
const quickFilters = [
  { label: 'Indoor 18m', params: 'location=Indoor&round=WA18' },
  { label: 'WA18', params: 'round=WA18' },
  { label: 'Portsmouth', params: 'round=Portsmouth' },
  { label: 'Novice friendly', params: 'level=Beginner,Novice' },
  { label: 'Recurve', params: 'bowstyle=Recurve' },
  { label: 'London', params: 'q=London' },
];

// Core filter form - used both in the sidebar and the mobile sheet
function CompetitionFiltersContent({
  onFilterChange,
}: {
  onFilterChange?: () => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('q') ?? '');
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

  // Push current filter state into the URL
  const applyFilters = () => {
    const params = new URLSearchParams();
    if (search) params.set('q', search);
    if (selectedRounds.length) params.set('round', selectedRounds.join(','));
    if (selectedBowstyles.length)
      params.set('bowstyle', selectedBowstyles.join(','));
    if (selectedLevels.length) params.set('level', selectedLevels.join(','));
    if (selectedLocation) params.set('location', selectedLocation);
    if (sort && sort !== 'soonest') params.set('sort', sort);
    router.push(`/competitions?${params.toString()}`);
    onFilterChange?.();
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedRounds([]);
    setSelectedBowstyles([]);
    setSelectedLevels([]);
    setSelectedLocation('');
    setSort('soonest');
    router.push('/competitions');
    onFilterChange?.();
  };

  const toggleArray = (
    value: string,
    current: string[],
    setter: (v: string[]) => void,
  ) => {
    setter(
      current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value],
    );
  };

  const hasFilters =
    search ||
    selectedRounds.length > 0 ||
    selectedBowstyles.length > 0 ||
    selectedLevels.length > 0 ||
    selectedLocation;

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search competitions or venues..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
          className="pl-9 bg-secondary border-border h-9"
        />
      </div>

      {/* Sort */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Sort by</label>
        <Select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-secondary border-border"
        >
          {sortOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      {/* Round type */}
      <FilterGroup label="Round Type">
        {roundTypes.map((round) => (
          <CheckboxRow
            key={round}
            label={round}
            checked={selectedRounds.includes(round)}
            onChange={() =>
              toggleArray(round, selectedRounds, setSelectedRounds)
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
              toggleArray(style, selectedBowstyles, setSelectedBowstyles)
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
              toggleArray(level, selectedLevels, setSelectedLevels)
            }
          />
        ))}
      </FilterGroup>

      {/* Indoor / Outdoor */}
      <FilterGroup label="Venue Type">
        {locations.map((loc) => (
          <CheckboxRow
            key={loc}
            label={loc}
            checked={selectedLocation === loc}
            onChange={() =>
              setSelectedLocation(selectedLocation === loc ? '' : loc)
            }
          />
        ))}
      </FilterGroup>

      {/* Actions */}
      <div className="flex flex-col gap-2 border-t border-border pt-4">
        <Button onClick={applyFilters} className="w-full">
          Apply Filters
        </Button>
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

// Small helper sub-components
function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">{label}</label>
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

// Public exports - Suspense wrappers required because useSearchParams()
// must be inside a Suspense boundary in Next.js App Router.

/** Desktop sidebar filter panel */
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
      <CompetitionFiltersContent />
    </Suspense>
  );
}

/** Mobile slide-over filter sheet */
export function MobileFilters() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary lg:hidden',
        )}
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
      </button>
      <SheetContent
        side="left"
        className="w-[300px] overflow-y-auto bg-background"
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
            <CompetitionFiltersContent onFilterChange={() => setOpen(false)} />
          </Suspense>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/** Quick-filter badge chips used on the homepage hero */
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
          className="cursor-pointer px-3 py-1 hover:bg-secondary transition-colors"
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
