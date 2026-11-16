import { useEffect, useRef } from 'react';

/**
 * Scroll-linked progress for hero sections.
 * Sets `--hero-p` on the element: 0 while the hero is fully in view,
 * rising to 1 once it has scrolled out. CSS uses it to animate the heading.
 * Does nothing when the visitor prefers reduced motion.
 */
export function useHeroScroll() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height * 0.85)));
      el.style.setProperty('--hero-p', p.toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return ref;
}
