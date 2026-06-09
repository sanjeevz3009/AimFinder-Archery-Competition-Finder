'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

type Step = 'idle' | 'loading' | 'success';

/**
 * Organiser event submission form.
 *
 * Demo flow - no real backend. In the next version this would:
 *   1. POST to an API route with Zod validation
 *   2. Save to a CMS / database with a review workflow
 *   3. Notify the admin team via email/webhook
 *   4. Once approved, trigger revalidatePath on the competitions pages
 *
 * For the demo I simulate a 1.2s network round-trip then show
 * a confirmation
 */
export function OrganiserSubmitForm() {
  const [step, setStep] = useState<Step>('idle');
  const [form, setForm] = useState({
    name: '',
    round: '',
    date: '',
    fee: '',
    venue: '',
    postcode: '',
    description: '',
  });

  const update =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('loading');
    // Simulate network round-trip
    await new Promise((r) => setTimeout(r, 1200));
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-accent/30 bg-accent/5 px-6 py-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/20">
          <CheckCircle2 className="h-8 w-8 text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Event submitted for review
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            We&apos;ll review your listing and publish it within 24 hours.
            You&apos;ll receive a confirmation once it&apos;s live.
          </p>
        </div>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          <Badge variant="outline">Under review</Badge>
          <Badge variant="outline">Publishes within 24hrs</Badge>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() => {
            setStep('idle');
            setForm({
              name: '',
              round: '',
              date: '',
              fee: '',
              venue: '',
              postcode: '',
              description: '',
            });
          }}
        >
          Submit another event
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Competition name" required>
          <Input
            placeholder="e.g. London Indoor WA18"
            value={form.name}
            onChange={update('name')}
            required
            className="border-border bg-background"
          />
        </FormField>

        <FormField label="Round type" required>
          <Input
            placeholder="e.g. WA18, Portsmouth"
            value={form.round}
            onChange={update('round')}
            required
            className="border-border bg-background"
          />
        </FormField>

        <FormField label="Date" required>
          <Input
            type="date"
            value={form.date}
            onChange={update('date')}
            required
            className="border-border bg-background"
          />
        </FormField>

        <FormField label="Entry fee">
          <Input
            placeholder="e.g. £15"
            value={form.fee}
            onChange={update('fee')}
            className="border-border bg-background"
          />
        </FormField>

        <FormField label="Venue name" required>
          <Input
            placeholder="e.g. Crystal Palace Sports Centre"
            value={form.venue}
            onChange={update('venue')}
            required
            className="border-border bg-background"
          />
        </FormField>

        <FormField label="Postcode" required>
          <Input
            placeholder="e.g. SE19 2BB"
            value={form.postcode}
            onChange={update('postcode')}
            required
            className="border-border bg-background"
          />
        </FormField>
      </div>

      <FormField label="Description">
        <Textarea
          placeholder="Tell archers about your event, what to expect, and who it's suitable for..."
          rows={4}
          value={form.description}
          onChange={update('description')}
          className="border-border bg-background"
        />
      </FormField>

      <Button
        type="submit"
        disabled={step === 'loading'}
        className="w-full sm:w-auto"
      >
        {step === 'loading' ? 'Submitting…' : 'Submit for review'}
      </Button>
    </form>
  );
}

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </label>
      {children}
    </div>
  );
}
