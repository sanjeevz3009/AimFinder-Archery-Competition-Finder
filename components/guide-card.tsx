import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Guide } from '@/lib/data';

/**
 * Card used on the guides index page and at the bottom of guide detail pages.
 * Matches the CompetitionCard hover behaviour exactly:
 *  - Card lifts on hover (-translate-y-1) with accent border + shadow
 *  - Title does NOT change colour on card hover
 *  - "Read guide" CTA only animates on direct button hover (group/btn scope)
 *  - mt-auto on CTA so all cards in a row align at the bottom
 */
export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Card className="flex h-full flex-col bg-card transition-all duration-200 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg">
      <CardContent className="flex flex-1 flex-col p-6">
        {/* Round metadata badges */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{guide.distance}</Badge>
          <Badge variant="outline">{guide.targetFace}</Badge>
          <Badge variant="outline">{guide.arrows}</Badge>
        </div>

        {/* Title - no colour change on card hover */}
        <h3 className="mt-3 text-xl font-semibold text-foreground">
          {guide.title}
        </h3>

        {/* Summary */}
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {guide.summary}
        </p>

        {/* Suitable bowstyles */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {guide.suitableFor.map((bowstyle) => (
            <Badge key={bowstyle} variant="outline" className="text-xs">
              {bowstyle}
            </Badge>
          ))}
        </div>

        {/* CTA - mt-auto pushes to bottom so all cards in a row align */}
        <div className="mt-auto pt-4">
          <Link
            href={`/guides/${guide.slug}`}
            className="group/btn flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
          >
            Read guide
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

// Four-column facts grid shown at the top of a guide detail page.
// Gives archers the key numbers at a glance.
export function GuideFactsGrid({ guide }: { guide: Guide }) {
  const facts = [
    { label: 'Distance', value: guide.distance },
    { label: 'Target Face', value: guide.targetFace },
    { label: 'Arrows', value: guide.arrows },
    { label: 'Suitable For', value: guide.suitableFor.join(', ') },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {facts.map((fact) => (
        <Card key={fact.label} className="border-border bg-secondary">
          <CardContent className="p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {fact.label}
            </p>
            <p className="mt-1 font-medium text-foreground">{fact.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
