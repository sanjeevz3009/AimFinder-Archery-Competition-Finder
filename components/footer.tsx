import Link from 'next/link';
import { Target } from 'lucide-react';

const footerLinks = {
  product: [
    { href: '/competitions', label: 'Competitions' },
    { href: '/assistant', label: 'AI Coach' },
    { href: '/guides/wa18', label: 'Guides' },
  ],
  resources: [
    { href: '/guides/wa18', label: 'WA18 Guide' },
    { href: '/guides/portsmouth', label: 'Portsmouth Guide' },
    { href: '/guides/novice-competitions', label: 'First Competition' },
    { href: '/guides/wa70', label: 'WA70 Outdoor Guide' },
  ],
  company: [
    { href: '/organisers', label: 'For Organisers' },
    { href: '#', label: 'About' },
  ],
};

// Site-wide footer. Server Component — no interactivity needed.
export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                <Target className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="text-xl font-semibold tracking-tight">
                AimFinder
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              The intelligent platform for discovering archery competitions that
              match your level and location.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Product
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Resources
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AimFinder. Built for the archery
            community.
          </p>
        </div>
      </div>
    </footer>
  );
}
