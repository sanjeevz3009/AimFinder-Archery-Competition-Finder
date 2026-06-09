import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Globe,
  Users,
  Search,
  RefreshCw,
  Calendar,
  MapPin,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { OrganiserSubmitForm } from '@/components/organiser-submit-form';
import { SpacesRemaining } from '@/components/spaces-remaining';
import { SubmitEventButton } from './submit-event-button';

// Static - this page rarely changes
export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'For Organisers',
  description:
    'Help archers discover your competitions. List your events on AimFinder and reach more suitable entrants.',
};

const benefits = [
  {
    icon: Globe,
    title: 'SEO-friendly event pages',
    description:
      'Every competition gets a dedicated, search-optimised page that ranks well for local archery searches.',
  },
  {
    icon: Users,
    title: 'Fewer unsuitable entries',
    description:
      'Clear suitability information helps archers self-select, reducing admin time dealing with mismatched entries.',
  },
  {
    icon: Search,
    title: 'Better beginner guidance',
    description:
      'AI recommendations guide novice archers to appropriate events, improving their experience and yours.',
  },
  {
    icon: RefreshCw,
    title: 'Dynamic availability',
    description:
      'Real-time spaces remaining updates encourage early registration and create natural urgency.',
  },
];

export default function OrganisersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <Badge className="mb-4 border-0 bg-accent/20 text-accent">
              For clubs and organisers
            </Badge>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Help archers discover your competitions
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              List your events on AimFinder to reach more suitable entrants,
              reduce admin overhead, and help archers find competitions that
              match their level.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <SubmitEventButton />
              <Button size="lg" variant="outline" asChild>
                <Link href="/competitions">See example listings</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-b border-border py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-foreground">
            Why list with AimFinder?
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <Card
                key={benefit.title}
                className="border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
                    <benefit.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Submission form + preview */}
      <section
        id="submit-event"
        className="border-b border-border bg-card py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Form */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-foreground">
                Submit your event
              </h2>
              <p className="mb-8 text-muted-foreground">
                Fill in the details below to list your competition on AimFinder.
                Our team will review and publish within 24 hours.
              </p>

              <OrganiserSubmitForm />
            </div>

            {/* Live preview card */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                How your listing will look
              </h3>
              <Card className="border-border bg-background">
                <CardContent className="p-6">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <Badge className="bg-accent text-accent-foreground">
                      Novice
                    </Badge>
                    <Badge variant="outline">WA18</Badge>
                    <Badge variant="outline">Indoor</Badge>
                    <Badge className="border-accent/30 bg-accent/20 text-accent">
                      Beginner Friendly
                    </Badge>
                  </div>

                  <h4 className="mb-3 text-xl font-semibold text-foreground">
                    London Indoor WA18 Novice Open
                  </h4>

                  <div className="mb-4 space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 shrink-0" />
                      <span>Saturday, 14 November 2026</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 shrink-0" />
                      <span>09:00 start</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 shrink-0" />
                      <span>North London Archery Centre, London</span>
                    </div>
                  </div>

                  <SpacesRemaining remaining={12} total={40} />

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    <Badge variant="secondary" className="text-xs">
                      Recurve
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Barebow
                    </Badge>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                    <span className="text-lg font-semibold text-foreground">
                      £18
                    </span>
                    <Button size="sm">View competition</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
