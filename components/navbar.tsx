'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Target, Menu, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/competitions', label: 'Competitions' },
  { href: '/guides/wa18', label: 'Guides' },
  { href: '/assistant', label: 'AI Coach' },
  { href: '/organisers', label: 'For Organisers' },
];

/**
 * Sticky top navigation bar.
 * Desktop: horizontal link row + CTA buttons.
 * Mobile: hamburger -> slide-over sheet.
 * Client Component because it uses usePathname for active link highlighting.
 */
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href ||
    (href !== '/' &&
      pathname.startsWith(href.split('/').slice(0, 2).join('/')));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
            <Target className="h-5 w-5 text-accent-foreground" />
          </div>
          <span className="text-xl font-semibold tracking-tight">
            AimFinder
          </span>
        </Link>

        {/* Desktop nav */}
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

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-secondary md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <SheetContent side="right" className="w-[280px] bg-background">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex flex-col gap-6 px-4 pt-6">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary',
                      isActive(link.href)
                        ? 'bg-secondary text-foreground'
                        : 'text-muted-foreground',
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-2 border-t border-border pt-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/assistant" onClick={() => setOpen(false)}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Ask AI Coach
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/competitions" onClick={() => setOpen(false)}>
                    Find Competitions
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
