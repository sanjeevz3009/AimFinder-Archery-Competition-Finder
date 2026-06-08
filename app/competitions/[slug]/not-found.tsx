import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CompetitionNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="text-2xl font-semibold text-foreground">
        Competition not found
      </h2>
      <p className="max-w-sm text-muted-foreground">
        This competition may have been removed or the link may be incorrect.
      </p>
      <Button asChild>
        <Link href="/competitions">
          Browse all competitions
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
