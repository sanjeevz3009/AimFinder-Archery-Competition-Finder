import Link from 'next/link';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SpacesRemaining } from '@/components/spaces-remaining';
import { formatDateShort } from '@/lib/utils';
import type { Competition } from '@/lib/data';

// Colour map for level badges - makes it immediately clear at a glance
// which competitions are beginner-friendly vs advanced.
const levelColors: Record<string, string> = {
  Beginner: 'bg-accent text-accent-foreground',
  Novice: 'bg-accent/70 text-accent-foreground',
  Club: 'bg-secondary text-secondary-foreground',
  County: 'bg-warning/80 text-warning-foreground',
  Open: 'bg-primary text-primary-foreground',
};

/**
 * Card displayed on the competitions listing page and the homepage.
 * Server Component - all props come from static/ISR data.
 *
 * Hover behaviour:
 *  - The whole card lifts slightly (-translate-y-1) and gets a subtle
 *    accent border - clean and intentional.
 *  - The "View competition" button only reacts when hovered directly
 *    (no group-hover bleed from the card level).
 *  - Cards use flex-col + flex-1 on the content area so all cards in
 *    a row reach the same height and the CTA button always aligns.
 */
export function CompetitionCard({ competition }: { competition: Competition }) {
  const formattedDate = formatDateShort(competition.date);

  return (
    <Card className="relative flex flex-col bg-card transition-all duration-200 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg">
      <CardContent className="flex flex-1 flex-col p-6">
        {/* Header row - level, round, indoor/outdoor, fee */}
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={levelColors[competition.level]}>
              {competition.level}
            </Badge>
            <Badge variant="outline">{competition.round}</Badge>
            <Badge variant="outline">{competition.indoorOutdoor}</Badge>
            {competition.beginnerFriendly && (
              <Badge className="border-accent/30 bg-accent/20 text-accent">
                Beginner Friendly
              </Badge>
            )}
          </div>
          <span className="text-lg font-semibold text-foreground">
            £{competition.entryFee}
          </span>
        </div>

        {/* Title - no colour change on card hover, only on direct hover */}
        <h3 className="mt-4 text-xl font-semibold leading-tight text-foreground">
          {competition.title}
        </h3>

        {/* Date, venue, spaces */}
        <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>
              {formattedDate} at {competition.time}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span>
              {competition.venue}, {competition.city}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Users className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <SpacesRemaining
              remaining={competition.spacesRemaining}
              total={competition.totalSpaces}
              showBar={false}
            />
          </div>
        </div>

        {/* Bowstyle tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {competition.bowstyles.map((bowstyle) => (
            <Badge key={bowstyle} variant="secondary" className="text-xs">
              {bowstyle}
            </Badge>
          ))}
        </div>

        {/*
         * CTA - pushed to the bottom via mt-auto so all cards align.
         * Arrow only animates when you hover the button itself.
         */}
        <div className="mt-auto pt-4">
          <Link
            href={`/competitions/${competition.slug}`}
            className="group/btn flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
          >
            View competition
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
