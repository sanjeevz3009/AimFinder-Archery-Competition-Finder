'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { archerLevels } from '@/lib/data';
import Link from 'next/link';

// Interactive level selector on the homepage.
// Lets archers self-identify their experience level and see
// tailored recommendations. Client Component - local state only.
export function LevelSelector() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedLevel = archerLevels.find((l) => l.id === selected);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <User className="h-5 w-5 text-accent" />
          What&apos;s your experience level?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Level option grid */}
        <div className="grid gap-2 sm:grid-cols-2">
          {archerLevels.map((level) => (
            <button
              key={level.id}
              type="button"
              onClick={() =>
                setSelected(level.id === selected ? null : level.id)
              }
              className={cn(
                'flex flex-col items-start gap-1 rounded-lg border p-4 text-left transition-all duration-150 hover:border-accent/50 hover:bg-accent/5',
                selected === level.id
                  ? 'border-accent bg-accent/10 shadow-sm'
                  : 'border-border',
              )}
            >
              <span className="font-medium text-foreground">{level.label}</span>
              <span className="text-sm text-muted-foreground">
                {level.description}
              </span>
            </button>
          ))}
        </div>

        {/* Recommendations panel - animates in once a level is selected */}
        {selectedLevel && (
          <div className="mt-4 rounded-lg border border-accent/30 bg-accent/5 p-4">
            <div className="mb-3 flex items-center gap-2">
              <Badge className="bg-accent text-accent-foreground">
                Recommended for {selectedLevel.label.toLowerCase()}s
              </Badge>
            </div>
            <ul className="space-y-2.5">
              {selectedLevel.recommendations.map((rec, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                  {rec}
                </li>
              ))}
            </ul>
            <Button asChild className="mt-4 w-full" size="sm">
              <Link
                href={`/competitions?level=${encodeURIComponent(selectedLevel.label)}`}
              >
                Find competitions for your level
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
