import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Target,
  Users,
  Sparkles,
  MapPin,
  Globe,
  ArrowRight,
  Code2,
  Heart,
  ExternalLink,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about AimFinder - the UK archery competition discovery platform - and the person who built it.',
};

const productValues = [
  {
    icon: Target,
    title: 'Built for archers',
    description:
      'Every decision, from the level filter to the AI coach, is designed around how archers actually think about finding competitions.',
  },
  {
    icon: Users,
    title: 'Community first',
    description:
      'AimFinder exists to grow participation in archery by reducing the friction of finding and entering suitable events.',
  },
  {
    icon: Sparkles,
    title: 'AI-guided discovery',
    description:
      'The AI coach goes beyond search filters, it understands your experience, bowstyle and location to recommend specific events with confidence.',
  },
  {
    icon: MapPin,
    title: 'UK-focused',
    description:
      'Designed specifically for the UK archery community, with support for Archery GB round formats, indoor and outdoor seasons, and regional events.',
  },
];

const techStack = [
  'Next.js 16 (App Router)',
  'TypeScript',
  'Tailwind CSS v4',
  'shadcn/ui',
  'Vercel AI SDK',
  'Anthropic Claude',
  'Vercel',
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
              <Target className="h-5 w-5 text-accent" />
            </div>
            <Badge variant="secondary">About AimFinder</Badge>
          </div>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            Helping archers find competitions that fit
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            AimFinder is a UK archery competition discovery platform. It exists
            because finding the right competition, one that matches your level,
            bowstyle, and location, is harder than it should be.
          </p>
        </div>
      </section>

      {/* Product values */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground">
            What we&apos;re building
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            AimFinder combines intelligent search, round format guides, and an
            AI coach to help archers at every level find the right events and
            enter them with confidence.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {productValues.map((value) => (
              <Card
                key={value.title}
                className="border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
                    <value.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Creator section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
              <Code2 className="h-5 w-5 text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              The person behind it
            </h2>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Bio */}
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                I&apos;m{' '}
                <span className="font-semibold text-foreground">
                  Sanjeev Srithevan
                </span>{' '}
                - a Senior Software Engineer based in London, and a recurve Olympic bow archer.
                I&apos;ve been shooting recurve for over a year and compete at
                club level.
              </p>
              <p>
                AimFinder is a project I&apos;ve been wanting to build for a
                while, it solves a real problem in the UK archery community. My
                coach and I are planning to pilot it at several clubs in London,
                and I&apos;ve already shared it with him for early feedback.
              </p>
              <p>
                In my day job I work as a Senior Software Engineer at the Office
                for National Statistics, building Django and Wagtail-based
                publishing platforms used at scale across the Civil Service.
              </p>
              <p>
                Outside of work I&apos;m into photography, go-karting, and
                formula car racing, and occasionally I write about the things
                I&apos;m building.
              </p>

              {/* Links */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://www.linkedin.com/in/sanjeev-srithevan-526718196/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:bg-secondary/80"
                >
                  <ExternalLink className="h-4 w-4 text-accent" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/sanjeevz3009"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:bg-secondary/80"
                >
                  <ExternalLink className="h-4 w-4 text-accent" />
                  GitHub
                </a>
                <a
                  href="https://sanj.ninja"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:bg-secondary/80"
                >
                  <Globe className="h-4 w-4 text-accent" />
                  sanj.ninja
                </a>
              </div>
            </div>

            {/* Tech stack + built with */}
            <div className="space-y-8">
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-accent" />
                    Built with
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Heart className="h-4 w-4 text-accent" />
                    Status
                  </h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                      <span>Actively developed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-accent" />
                      <span>Piloting at London archery clubs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-accent" />
                      <span>Open to feedback from clubs and organisers</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-card py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground">
            Try it yourself
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Search for competitions, read the round guides, or ask the AI coach
            for a personal recommendation.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/competitions">
                Find competitions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/assistant">
                <Sparkles className="mr-2 h-5 w-5" />
                Ask the AI coach
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
