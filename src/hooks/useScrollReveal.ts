import { useEffect, useRef, useState } from 'react';

/**
 * Adds the `is-visible` class to any element with the `reveal` class
 * when it enters the viewport. Returns a ref to attach to a container.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options?: { threshold?: number; rootMargin?: string; once?: boolean }
) {
  const ref = useRef<T>(null);
  const { threshold = 0.15, rootMargin = '0px 0px -60px 0px', once = true } = options ?? {};

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold, rootMargin }
    );

    // Observe the container itself and all descendants with .reveal
    const targets: HTMLElement[] = el.classList.contains('reveal') ? [el] : [];
    el.querySelectorAll<HTMLElement>('.reveal').forEach((c) => targets.push(c));
    targets.forEach((t) => observer.observe(t));

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}

/**
 * Counts up to `end` when the returned ref enters the viewport.
 */
export function useCountUp(end: number, duration = 1800, decimals = 0) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            // easeOutExpo
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setValue(end * eased);
            if (progress < 1) requestAnimationFrame(tick);
            else setValue(end);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  const formatted =
    decimals > 0
      ? value.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      : Math.round(value).toLocaleString('en-IN');

  return { ref, formatted };
}
