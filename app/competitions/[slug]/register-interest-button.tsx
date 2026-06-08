'use client';

import { useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Competition } from '@/lib/data';

type Step = 'idle' | 'open' | 'success';

/**
 * Demo "Register Interest" flow.
 *
 * In production this would:
 *   1. POST to an API route that validates input with Zod
 *   2. Save to a database
 *   3. Send a confirmation email
 *   4. Decrement spacesRemaining and trigger revalidatePath
 *
 * For the demo I collect name + email and show a
 * confirmation message - no real backend required.
 */
export function RegisterInterestButton({
  competition,
}: {
  competition: Competition;
}) {
  const [step, setStep] = useState<Step>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate a network round-trip
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setStep('success');
  };

  const reset = () => {
    setStep('idle');
    setName('');
    setEmail('');
  };

  if (step === 'idle') {
    return (
      <Button className="w-full" onClick={() => setStep('open')}>
        Register Interest
      </Button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={reset}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card p-6 shadow-xl"
      >
        {/* Close button */}
        <button
          onClick={reset}
          className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {step === 'open' && (
          <>
            <h2
              id="modal-title"
              className="mb-1 text-lg font-semibold text-foreground"
            >
              Register your interest
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              {competition.title}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  Full name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Jane Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-10 bg-background"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jane@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-10 bg-background"
                />
              </div>

              <p className="text-xs text-muted-foreground">
                We&apos;ll send you event details and a reminder before the
                competition date.
              </p>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={reset}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? 'Submitting…' : 'Submit'}
                </Button>
              </div>
            </form>
          </>
        )}

        {step === 'success' && (
          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/20">
              <CheckCircle2 className="h-8 w-8 text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                You&apos;re registered!
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                We&apos;ve noted your interest in{' '}
                <span className="font-medium text-foreground">
                  {competition.title}
                </span>
                . Check your email for confirmation details.
              </p>
            </div>
            <Button onClick={reset} variant="outline" className="mt-2 w-full">
              Close
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
