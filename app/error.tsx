'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Root error boundary - catches uncaught exceptions in the app.
 * Must be a Client Component per Next.js docs.
 *
 * In production this is where we'd log to an error reporting
 * service (e.g. Sentry) via the useEffect.
 */
export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // Log to error reporting service in production
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="h-7 w-7 text-destructive" />
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Something went wrong
        </h2>
        <p className="mt-2 max-w-sm text-muted-foreground">
          An unexpected error occurred. You can try again or head back to the
          homepage.
        </p>
        {error.digest && (
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button onClick={() => unstable_retry()} variant="outline">
          Try again
        </Button>
        <Button asChild>
          <Link href="/">
            Back to home
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
