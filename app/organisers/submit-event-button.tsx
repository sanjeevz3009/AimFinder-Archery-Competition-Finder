'use client';

import { ArrowRight } from 'lucide-react';

/**
 * Smooth-scrolls to the #submit-event form section when clicked.
 * Extracted as a Client Component so the organisers page stays a Server Component.
 */
export function SubmitEventButton() {
  return (
    <button
      onClick={() => {
        document
          .getElementById('submit-event')
          ?.scrollIntoView({ behavior: 'smooth' });
      }}
      className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
    >
      Submit your event
      <ArrowRight className="h-5 w-5" />
    </button>
  );
}
