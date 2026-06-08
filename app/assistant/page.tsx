import type { Metadata } from 'next';
import { Sparkles } from 'lucide-react';

// Dynamic - AI responses are never cached
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'AI Coach',
  description:
    'Get personalised archery competition recommendations from our AI coach based on your experience, bowstyle, and location.',
};

/**
 * AI assistant page.
 * The AiAssistantPanel component is added in Phase 4 once the
 * streaming API route is wired up. For now I render a placeholder
 * so the route and nav link work during development.
 */
export default function AssistantPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/20">
            <Sparkles className="h-7 w-7 text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">AI Coach</h1>
          <p className="mt-3 text-muted-foreground">
            Tell me your experience level, bowstyle, and location - I&apos;ll
            recommend competitions that are right for you.
          </p>
        </div>

        {/* AiAssistantPanel replaces this placeholder in Phase 4 */}
        <div className="rounded-xl border border-dashed border-border bg-card/50 p-12 text-center">
          <p className="text-sm text-muted-foreground">
            AI assistant coming in Phase 4
          </p>
        </div>
      </div>
    </div>
  );
}
