import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Guide } from '@/lib/data';

// Card used on the homepage and at the bottom of guide detail pages
// to link to other guides.
export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Card className="group overflow-hidden transition-all hover:border-accent/50 bg-card">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          {/* Round metadata badges */}
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{guide.distance}</Badge>
            <Badge variant="outline">{guide.targetFace}</Badge>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
            {guide.title}
          </h3>

          {/* Summary */}
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {guide.summary}
          </p>

          {/* Suitable bowstyles */}
          <div className="flex flex-wrap gap-1.5">
            {guide.suitableFor.map((bowstyle) => (
              <Badge key={bowstyle} variant="outline" className="text-xs">
                {bowstyle}
              </Badge>
            ))}
          </div>

          <Button
            asChild
            variant="outline"
            className="mt-2 w-full group-hover:bg-secondary"
          >
            <Link href={`/guides/${guide.slug}`}>
              Read guide
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
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
        <Card key={fact.label} className="bg-secondary border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              {fact.label}
            </p>
            <p className="mt-1 font-medium text-foreground">{fact.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
