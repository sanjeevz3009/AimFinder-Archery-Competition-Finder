import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ChevronRight,
  ArrowRight,
  Banknote,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LiveSpaces } from '@/components/live-spaces';
import { CompetitionCard } from '@/components/competition-card';
import { RegisterInterestButton } from './register-interest-button';
import {
  competitions,
  getCompetitionBySlug,
  getRelatedCompetitions,
} from '@/lib/data';
import { formatDateLong } from '@/lib/utils';

// ISR - pre-render all competition pages at build time, revalidate hourly.
// On-demand revalidation via /api/revalidate would replace this in production.
export const revalidate = 3600;

export async function generateStaticParams() {
  return competitions.map((c) => ({ slug: c.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const competition = getCompetitionBySlug(slug);

  if (!competition) return { title: 'Competition Not Found' };

  return {
    title: competition.title,
    description: competition.description,
    openGraph: {
      title: `${competition.title} | AimFinder`,
      description: competition.description,
      type: 'article',
    },
  };
}

// Level colours - keep consistent with CompetitionCard
const levelColors: Record<string, string> = {
  Beginner: 'bg-accent text-accent-foreground',
  Novice: 'bg-accent/70 text-accent-foreground',
  Club: 'bg-secondary text-secondary-foreground',
  County: 'bg-warning/80 text-warning-foreground',
  Open: 'bg-primary text-primary-foreground',
};

export default async function CompetitionDetailPage(props: { params: Params }) {
  const { slug } = await props.params;
  const competition = getCompetitionBySlug(slug);

  if (!competition) notFound();

  const related = getRelatedCompetitions(slug, competition.round, 3);
  const formattedDate = formatDateLong(competition.date);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2 text-sm text-muted-foreground"
        >
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            href="/competitions"
            className="transition-colors hover:text-foreground"
          >
            Competitions
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{competition.title}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge className={levelColors[competition.level]}>
              {competition.level}
            </Badge>
            <Badge variant="outline">{competition.round}</Badge>
            <Badge variant="outline">{competition.indoorOutdoor}</Badge>
            {competition.beginnerFriendly && (
              <Badge className="border-accent/30 bg-accent/20 text-accent">
                Beginner Friendly
              </Badge>
            )}
          </div>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            {competition.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {competition.description}
          </p>
        </div>

        {/* Main detail grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left column - key details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-base">Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <DetailRow icon={Calendar} label="Date" value={formattedDate} />
                <DetailRow
                  icon={Clock}
                  label="Start time"
                  value={competition.time}
                />
                <DetailRow
                  icon={MapPin}
                  label="Venue"
                  value={`${competition.venue}, ${competition.city}`}
                />
                <DetailRow
                  icon={MapPin}
                  label="Postcode"
                  value={competition.postcode}
                />
                <DetailRow
                  icon={Users}
                  label="Organiser"
                  value={competition.organiser}
                />
                <DetailRow
                  icon={Banknote}
                  label="Entry fee"
                  value={`£${competition.entryFee}`}
                />
              </CardContent>
            </Card>

            {/* Round & bowstyle info */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-base">Round & Bowstyles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                    Round
                  </p>
                  <Badge variant="outline" className="text-sm">
                    {competition.round}
                  </Badge>
                </div>
                <div>
                  <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
                    Accepted bowstyles
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {competition.bowstyles.map((b) => (
                      <Badge key={b} variant="secondary">
                        {b}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                    Level
                  </p>
                  <Badge className={levelColors[competition.level]}>
                    {competition.level}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Guide link */}
            <Card className="border-accent/20 bg-accent/5">
              <CardContent className="p-6">
                <h3 className="mb-1 font-semibold text-foreground">
                  Not sure what the {competition.round} involves?
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Read our guide to understand distances, arrow counts, and what
                  to expect on the day.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link
                    href={`/guides/${competition.round
                      .toLowerCase()
                      .replace(' ', '-')}`}
                  >
                    Read the {competition.round} guide
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right column - availability + CTA */}
          <div className="space-y-4">
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold text-foreground">
                  Availability
                </h3>

                {/*
                 * LiveSpaces polls /api/spaces/[slug] every 30s with no-store.
                 * The ISR competition page stays cached and fast for SEO,
                 * while this client island always shows fresh availability.
                 * Initial values from the page props avoid any loading flash.
                 */}
                <LiveSpaces
                  slug={competition.slug}
                  initialRemaining={competition.spacesRemaining}
                  initialTotal={competition.totalSpaces}
                />

                <div className="mt-6">
                  <RegisterInterestButton competition={competition} />
                </div>
              </CardContent>
            </Card>

            {/* Entry fee callout */}
            <Card className="border-border bg-card">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-muted-foreground">Entry fee</p>
                <p className="mt-1 text-4xl font-bold text-foreground">
                  £{competition.entryFee}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related competitions */}
        {related.length > 0 && (
          <section className="mt-16">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                More {competition.round} competitions
              </h2>
              <Button variant="outline" size="sm" asChild>
                <Link
                  href={`/competitions?round=${encodeURIComponent(
                    competition.round,
                  )}`}
                >
                  View all
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c) => (
                <CompetitionCard key={c.slug} competition={c} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// Small helper - consistent label/value row for the detail card
function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="font-medium text-foreground">{value}</p>
      </div>
    </div>
  );
}
