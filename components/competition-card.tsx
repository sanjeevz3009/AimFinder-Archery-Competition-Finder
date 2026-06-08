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

// Card displayed on the competitions listing page and the homepage.
// Server Component - all props come from static/ISR data.
export function CompetitionCard({ competition }: { competition: Competition }) {
  const formattedDate = formatDateShort(competition.date);

  return (
    <Card className="group relative overflow-hidden transition-all hover:border-accent/50 bg-card">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          {/* Header row — level, round, indoor/outdoor, fee */}
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={levelColors[competition.level]}>
                {competition.level}
              </Badge>
              <Badge variant="outline">{competition.round}</Badge>
              <Badge variant="outline">{competition.indoorOutdoor}</Badge>
              {competition.beginnerFriendly && (
                <Badge className="bg-accent/20 text-accent border-accent/30">
                  Beginner Friendly
                </Badge>
              )}
            </div>
            <span className="text-lg font-semibold text-foreground">
              £{competition.entryFee}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold leading-tight text-foreground group-hover:text-accent transition-colors">
            {competition.title}
          </h3>

          {/* Date, venue, spaces */}
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
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
          <div className="flex flex-wrap gap-1.5">
            {competition.bowstyles.map((bowstyle) => (
              <Badge key={bowstyle} variant="secondary" className="text-xs">
                {bowstyle}
              </Badge>
            ))}
          </div>

          {/* CTA */}
          <Button
            asChild
            variant="outline"
            className="mt-2 w-full group-hover:bg-secondary"
          >
            <Link href={`/competitions/${competition.slug}`}>
              View competition
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
