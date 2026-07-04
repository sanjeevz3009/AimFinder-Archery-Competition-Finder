'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Target,
  Menu,
  X,
  Sparkles,
  Trophy,
  BookOpen,
  Bot,
  Building2,
  Home,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/competitions', label: 'Competitions', icon: Trophy },
  { href: '/guides', label: 'Guides', icon: BookOpen },
  { href: '/assistant', label: 'AI Coach', icon: Bot },
  { href: '/organisers', label: 'For Organisers', icon: Building2 },
  { href: '/about', label: 'About', icon: Info },
];

/**
 * Sticky top navigation bar.
 *
 * Desktop: horizontal link row + CTA buttons.
 * Mobile: hamburger -> full-width slide-down overlay menu.
 *   A full-width overlay on mobile looks far cleaner than a
 *   partial-width side drawer on small screens.
 */
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/'
      ? pathname === '/'
      : pathname === href || pathname.startsWith(href + '/');

  // Lock body scroll and close on Escape while the mobile menu is open
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
              <Target className="h-5 w-5 text-accent-foreground" />
            </div>
            <span className="text-xl font-semibold tracking-tight">
              AimFinder
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary',
                  isActive(link.href)
                    ? 'text-foreground'
                    : 'text-muted-foreground',
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/assistant">
                <Sparkles className="mr-1 h-4 w-4" />
                Ask AI
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/competitions">Find Competitions</Link>
            </Button>
          </div>

          {/* Mobile hamburger / close toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground transition-colors hover:bg-secondary md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      {/*
       * Mobile menu - full-width overlay that slides down from the navbar.
       * Rendered outside the <header> so it covers the full viewport width
       * without being clipped by the header's overflow.
       */}
      {open && (
        <>
          {/* Backdrop - closes menu on tap outside */}
          <div
            className="fixed inset-0 top-16 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Menu panel */}
          <div className="fixed inset-x-0 top-16 z-50 border-b border-border bg-background shadow-xl md:hidden">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
              {/* Nav links with icons - large touch targets */}
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors',
                        isActive(link.href)
                          ? 'bg-secondary text-foreground'
                          : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0 text-accent" />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              {/* CTA buttons */}
              <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
                <Button asChild className="w-full justify-center">
                  <Link href="/competitions" onClick={() => setOpen(false)}>
                    Find Competitions
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="w-full justify-center"
                >
                  <Link href="/assistant" onClick={() => setOpen(false)}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Ask AI Coach
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
