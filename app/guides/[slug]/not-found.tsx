import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function GuideNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="text-2xl font-semibold text-foreground">
        Guide not found
      </h2>
      <p className="max-w-sm text-muted-foreground">
        This guide doesn&apos;t exist yet. Try the WA18 or Portsmouth guides to
        get started.
      </p>
      <Button asChild>
        <Link href="/guides/wa18">
          Read the WA18 guide
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
