'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroSearch } from '@/components/hero-search';

const TITLE = 'Find archery competitions that match your level';
const CHAR_DELAY = 30;
const TYPE_START = 300;
const FADE_START_AFTER_TYPE = 400;

export function HeroAnimation() {
  const [typed, setTyped] = useState('');
  const [showRest, setShowRest] = useState(false);
  // Store the active timer in a ref so cleanup always cancels the right one
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;
    let charIndex = 0;

    const typeNextChar = () => {
      if (cancelled) return;
      charIndex++;
      setTyped(TITLE.slice(0, charIndex));

      if (charIndex < TITLE.length) {
        timerRef.current = setTimeout(typeNextChar, CHAR_DELAY);
      } else {
        // Typing complete - fade in the rest
        timerRef.current = setTimeout(() => {
          if (!cancelled) setShowRest(true);
        }, FADE_START_AFTER_TYPE);
      }
    };

    // Initial delay before typing begins
    timerRef.current = setTimeout(typeNextChar, TYPE_START);

    return () => {
      // Cancel flag stops any in-flight callbacks from calling setState
      cancelled = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <>
      {/*
       * Title wrapper uses a visibility trick to reserve the exact final height
       * from the very first render, preventing any layout shift as characters type.
       *
       * The invisible full title sits in normal flow (determining height),
       * while the typed text is absolutely positioned on top of it.
       */}
      <div className="relative">
        {/* Invisible full title - reserves the correct height always */}
        <h1
          aria-hidden="true"
          className="invisible text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          {TITLE}
        </h1>

        {/* Visible typed text - purely decorative animation, hidden from assistive tech */}
        <h1
          aria-hidden="true"
          className="absolute inset-0 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          {typed}
          {typed.length < TITLE.length && (
            <span className="ml-0.5 inline-block w-0.75 animate-pulse rounded-sm bg-accent align-middle leading-none">
              &nbsp;
            </span>
          )}
        </h1>

        {/* Accessible title - announced once as the complete sentence, not character-by-character */}
        <h1 className="sr-only">{TITLE}</h1>
      </div>

      {/* Subtitle */}
      <FadeIn show={showRest} delay={0}>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Search indoor, outdoor, novice, club and open competitions near you -
          with AI guidance to help you choose the right event.
        </p>
      </FadeIn>

      {/* CTA buttons */}
      <FadeIn show={showRest} delay={150}>
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
      </FadeIn>

      {/* Search bar */}
      <FadeIn show={showRest} delay={300}>
        <div className="mt-12 max-w-xl">
          <HeroSearch />
        </div>
      </FadeIn>
    </>
  );
}

function FadeIn({
  show,
  delay,
  children,
}: {
  show: boolean;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
