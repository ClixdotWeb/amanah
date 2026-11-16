import { useState } from 'react';
import { media } from '../data/media';
import { site } from '../data/site';
import { classNames } from '../utils/format';
import Motif from './Motif';

/**
 * One image slot. Pass `id` (a key in data/media.js) or the fields directly.
 * Shows the photo when `src` is set and loads, otherwise a brand placeholder.
 * The parent sets the size; Media always fills it.
 */
export default function Media({ id, src, alt, label, tone, motif, eager = false, className, showLabel = true }) {
  const entry = (id && media[id]) || {};
  const finalSrc = src ?? entry.src;
  const finalAlt = alt ?? entry.alt ?? '';
  const finalTone = tone ?? entry.tone ?? 'deep';
  const finalMotif = motif ?? entry.motif ?? 'monogram';
  const finalLabel = label ?? entry.label;
  const [failed, setFailed] = useState(false);

  if (finalSrc && !failed) {
    return (
      <img
        className={classNames('media', className)}
        src={finalSrc}
        alt={finalAlt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div
      className={classNames('media ph', `ph--${finalTone}`, className)}
      role="img"
      aria-label={finalAlt || finalLabel || 'Image coming soon'}
    >
      <Motif name={finalMotif} className="ph__motif" />
      {showLabel && site.showImageLabels && finalLabel && <span className="ph__tag">{finalLabel}</span>}
    </div>
  );
}
