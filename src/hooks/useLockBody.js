import { useEffect } from 'react';

/** Locks page scroll while `active` (modals, drawers) and closes on Escape. */
export function useLockBody(active, onEscape) {
  useEffect(() => {
    if (!active) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape' && onEscape) onEscape();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [active, onEscape]);
}
