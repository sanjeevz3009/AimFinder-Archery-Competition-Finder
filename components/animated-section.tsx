'use client';

import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Delay in milliseconds before the animation plays after the element
   * enters the viewport. Use staggered delays for child elements in a grid.
   */
  delay?: number;
  /**
   * How far below its final position the element starts (in px).
   * Default 24px gives a subtle, professional lift.
   */
  distance?: number;
  /** How much of the element must be visible to trigger (0–1). Default 0.1 */
  threshold?: number;
}

/**
 * Wraps any content with a scroll-triggered fade-up animation.
 *
 * Uses IntersectionObserver - no external library, zero bundle cost.
 * Animates once: once in view it stays visible even if scrolled past.
 *
 * Example:
 *   <AnimatedSection delay={200}>
 *     <CompetitionCard ... />
 *   </AnimatedSection>
 */
export function AnimatedSection({
  children,
  className,
  delay = 0,
  distance = 24,
  threshold = 0.1,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      // h-full ensures this wrapper doesn't collapse grid row height
      className={cn('h-full', className)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : `translateY(${distance}px)`,
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
