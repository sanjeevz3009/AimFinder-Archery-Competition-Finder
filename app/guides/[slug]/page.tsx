import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ChevronRight,
  Target,
  BookOpen,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GuideFactsGrid, GuideCard } from '@/components/guide-card';
import { guides, competitions, getGuideBySlug } from '@/lib/data';

// SSG + ISR - guide content changes rarely so I pre-render at build time
// and revalidate every 24 hours.
export const revalidate = 86400;

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const guide = getGuideBySlug(slug);

  if (!guide) return { title: 'Guide Not Found' };

  return {
    title: guide.title,
    description: guide.summary,
    openGraph: {
      title: `${guide.title} | AimFinder`,
      description: guide.summary,
      type: 'article',
    },
  };
}

export default async function GuidePage(props: { params: Params }) {
  const { slug } = await props.params;
  const guide = getGuideBySlug(slug);

  if (!guide) notFound();

  // Other guides to show at the bottom
  const otherGuides = guides.filter((g) => g.slug !== guide.slug);

  // Competitions that use this round - link archers directly to entries
  const relatedCompetitions = competitions
    .filter(
      (c) =>
        c.round.toLowerCase().replace(/\s+/g, '-') === slug ||
        c.round.toLowerCase() === slug.replace(/-/g, ' '),
    )
    .slice(0, 3);

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
            href="/guides/wa18"
            className="transition-colors hover:text-foreground"
          >
            Guides
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{guide.title}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <Badge variant="secondary">
              <BookOpen className="mr-1 h-3 w-3" />
              Guide
            </Badge>
          </div>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            {guide.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {guide.summary}
          </p>
        </div>

        {/* Key facts grid */}
        <GuideFactsGrid guide={guide} />

        {/* Main content */}
        <div className="mt-10 space-y-8">
          {/* Overview */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-accent" />
                Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {guide.content.split('\n\n').map((para, i) => {
                  // Bold headers (lines starting with **)
                  if (para.startsWith('**')) {
                    const [header, ...rest] = para.split('\n');
                    return (
                      <div key={i}>
                        <h3 className="mb-2 font-semibold text-foreground">
                          {header.replace(/\*\*/g, '')}
                        </h3>
                        {rest.length > 0 && <p>{rest.join(' ')}</p>}
                      </div>
                    );
                  }
                  return <p key={i}>{para}</p>;
                })}
              </div>
            </CardContent>
          </Card>

          {/* Beginner tips */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-accent" />
                Tips for beginners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {guide.beginnerTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-medium text-accent">
                      {i + 1}
                    </span>
                    <span className="pt-0.5 text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {/* FAQs */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-accent" />
                Frequently asked questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {guide.faqs.map((faq, i) => (
                <div key={i} className="space-y-2">
                  <h4 className="font-medium text-foreground">
                    {faq.question}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Related competitions CTA */}
          {relatedCompetitions.length > 0 && (
            <Card className="border-accent/20 bg-accent/5">
              <CardContent className="p-6">
                <h3 className="mb-1 font-semibold text-foreground">
                  Ready to enter a {guide.title.split(' ')[0]} competition?
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  We found {relatedCompetitions.length} upcoming{' '}
                  {guide.slug.replace(/-/g, ' ').toUpperCase()} competitions.
                </p>
                <Button asChild>
                  <Link
                    href={`/competitions?round=${encodeURIComponent(
                      guide.slug.replace(/-/g, ' ').toUpperCase(),
                    )}`}
                  >
                    View competitions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Other guides */}
        {otherGuides.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-2xl font-bold text-foreground">
              Other guides
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {otherGuides.map((g) => (
                <GuideCard key={g.slug} guide={g} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
