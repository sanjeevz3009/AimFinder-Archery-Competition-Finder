import Link from 'next/link';
import {
  Search,
  Sparkles,
  BookOpen,
  Target,
  Users,
  Building2,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CompetitionCard } from '@/components/competition-card';
import { LevelSelector } from '@/components/level-selector';
import { HeroSearch } from '@/components/hero-search';
import { competitions } from '@/lib/data';

// ISR: revalidate every hour. The homepage content is mostly stable but
// we want featured competitions to update when new events are added.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'AimFinder — Find Archery Competitions That Match Your Level',
  description:
    'Search indoor, outdoor, novice, club and open archery competitions near you — with AI guidance to help you choose the right event.',
};

// Show the 3 most imminent competitions as featured
const featuredCompetitions = competitions
  .slice()
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  .slice(0, 3);

const howItWorks = [
  {
    icon: Search,
    title: 'Search by level and location',
    description:
      'Find competitions near you that match your experience level and bowstyle preferences.',
  },
  {
    icon: BookOpen,
    title: 'Understand the round format',
    description:
      'Read our guides to learn about different round types before you enter.',
  },
  {
    icon: Sparkles,
    title: 'Get AI guidance before entering',
    description:
      'Ask our AI coach for personalised recommendations based on your experience.',
  },
];

const valueProps = [
  {
    icon: Target,
    title: 'For archers',
    description:
      'Find suitable events faster. Filter by level, bowstyle, and location to discover competitions that match your experience.',
    highlight: 'Find your perfect competition',
  },
  {
    icon: Users,
    title: 'For clubs',
    description:
      'Improve event discovery. Help potential entrants find your competitions through intelligent search and filtering.',
    highlight: 'Reach more archers',
  },
  {
    icon: Building2,
    title: 'For organisers',
    description:
      'Reduce unsuitable entries. Clear suitability information helps archers self-select appropriate events.',
    highlight: 'Better quality entries',
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="max-w-3xl">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Find archery competitions that match your level
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Search indoor, outdoor, novice, club and open competitions near
              you — with AI guidance to help you choose the right event.
            </p>

            {/* Primary CTAs */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/competitions">
                  <Search className="mr-2 h-5 w-5" />
                  Find competitions
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/assistant">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Ask the AI coach
                </Link>
              </Button>
            </div>

            {/* Hero search — client component so it can use useRouter */}
            <div className="mt-12 max-w-xl">
              <HeroSearch />
            </div>
          </div>
        </div>
      </section>

      {/* Featured competitions */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                Featured competitions
              </h2>
              <p className="mt-2 text-muted-foreground">
                Upcoming events that are accepting entries
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/competitions">
                View all competitions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredCompetitions.map((competition) => (
              <CompetitionCard
                key={competition.slug}
                competition={competition}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-border bg-card py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">How it works</h2>
            <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
              From discovery to entry, we help you find the right competition
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {howItWorks.map((item, index) => (
              <Card
                key={item.title}
                className="border-border bg-background transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20">
                      <item.icon className="h-6 w-6 text-accent" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      Step {index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Level selector */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            {/* Left col — static, never moves */}
            <div className="lg:pt-2">
              <h2 className="text-3xl font-bold text-foreground">
                Competitions for every level
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Whether you&apos;re shooting your first competition or competing
                at county level, we help you find events that match your
                experience.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  'Beginner-friendly events with mentoring',
                  'Novice competitions for building experience',
                  'Club-level shoots for regular competitors',
                  'County and open events for serious archers',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-accent" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Right col — grows as recommendations appear, left col unaffected */}
            <div>
              <LevelSelector />
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="bg-card py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground">
              Built for the archery community
            </h2>
            <p className="mt-2 text-muted-foreground">
              Helping archers, clubs, and organisers connect
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {valueProps.map((prop) => (
              <Card
                key={prop.title}
                className="border-border bg-background transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20">
                    <prop.icon className="h-6 w-6 text-accent" />
                  </div>
                  <Badge className="mb-4 border-0 bg-accent/20 text-accent">
                    {prop.highlight}
                  </Badge>
                  <h3 className="text-xl font-semibold text-foreground">
                    {prop.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {prop.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground">
            Ready to find your next competition?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Start searching now or ask our AI coach for personalised
            recommendations based on your experience level and location.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/competitions">
                Browse competitions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/assistant">
                <Sparkles className="mr-2 h-5 w-5" />
                Get AI recommendations
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
