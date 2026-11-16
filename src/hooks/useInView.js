import { useEffect, useRef, useState } from 'react';

/**
 * true once the element has entered the viewport (stays true).
 * Uses IntersectionObserver plus a scroll/resize position check as a
 * fallback, so content can never get stuck hidden.
 */
export function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return undefined;

    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92 && r.bottom > 0) setInView(true);
    };

    let io;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) setInView(true);
      });
      io.observe(el);
    }
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      io?.disconnect();
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [inView]);

  return [ref, inView];
}
