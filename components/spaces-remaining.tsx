'use client';

import { cn } from '@/lib/utils';

type SpacesRemainingProps = {
  remaining: number;
  total: number;
  showBar?: boolean;
  className?: string;
};

// Displays spaces remaining with a colour-coded progress bar.
// Red when ≤15% remain, amber when ≤40%, green otherwise.
// Used on CompetitionCard and the competition detail page.
export function SpacesRemaining({
  remaining,
  total,
  showBar = true,
  className,
}: SpacesRemainingProps) {
  const percentage = (remaining / total) * 100;
  const isLow = percentage <= 15;
  const isMedium = percentage > 15 && percentage <= 40;

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className="flex items-center gap-2">
        <span
          className={cn(
            'text-sm font-medium',
            isLow && 'text-destructive',
            isMedium && 'text-warning',
            !isLow && !isMedium && 'text-accent',
          )}
        >
          {remaining} of {total} spaces remaining
        </span>
        {isLow && (
          <span className="inline-flex items-center rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
            Almost full
          </span>
        )}
      </div>

      {showBar && (
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500',
              isLow && 'bg-destructive',
              isMedium && 'bg-warning',
              !isLow && !isMedium && 'bg-accent',
            )}
            // Bar shows how full the event is (inverse of remaining)
            style={{ width: `${100 - percentage}%` }}
          />
        </div>
      )}
    </div>
  );
}
