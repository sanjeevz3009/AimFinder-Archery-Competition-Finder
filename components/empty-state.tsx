import { Search, FileQuestion, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type EmptyStateProps = {
  icon?: 'search' | 'question' | 'warning';
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
};

const icons = {
  search: Search,
  question: FileQuestion,
  warning: AlertTriangle,
};

// Generic empty / zero-results state used on the competitions listing
// and anywhere data fails to load.
export function EmptyState({
  icon = 'search',
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  const Icon = icons[icon];

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 p-8 text-center',
        className,
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>
      {action && (
        <div className="mt-6">
          {action.href ? (
            <Button asChild>
              <Link href={action.href}>{action.label}</Link>
            </Button>
          ) : (
            <Button onClick={action.onClick}>{action.label}</Button>
          )}
        </div>
      )}
    </div>
  );
}

// Pre-configured error state - drop-in replacement when a fetch fails.
export function ErrorState({
  title = 'Something went wrong',
  description = "We couldn't load the data. Please try again.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <EmptyState
      icon="warning"
      title={title}
      description={description}
      action={onRetry ? { label: 'Try again', onClick: onRetry } : undefined}
    />
  );
}
