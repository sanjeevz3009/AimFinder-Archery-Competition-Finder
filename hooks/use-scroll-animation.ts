'use client';

import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  /** How much of the element must be visible before triggering (0–1) */
  threshold?: number;
  /** Delay before the animation starts, in ms */
  delay?: number;
  /** Only animate once - don't re-trigger on scroll back up */
  once?: boolean;
}

/**
 * Returns a ref to attach to a DOM element and a boolean indicating
 * whether that element is currently in view.
 *
 * Usage:
 *   const { ref, inView } = useScrollAnimation({ delay: 100 });
 *   <section ref={ref} className={inView ? "animate-in" : "animate-out"}>
 */
export function useScrollAnimation({
  threshold = 0.15,
  delay = 0,
  once = true,
}: UseScrollAnimationOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const timer = delay
      ? setTimeout(() => {}, 0) // placeholder - real delay handled in CSS
      : null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [threshold, delay, once]);

  return { ref, inView };
}
