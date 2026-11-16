import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { classNames } from '../utils/format';
import Media from './Media';
import { motifFor } from './ProductCard';

export default function ProductGallery({ product, compact = false }) {
  const [index, setIndex] = useState(0);
  // Only real photos. With no photos yet, show a single placeholder.
  const photos = product.images.filter((img) => img.src);
  const images = photos.length ? photos : product.images.slice(0, 1);
  const many = images.length > 1;
  const go = (d) => setIndex((i) => (i + d + images.length) % images.length);

  return (
    <div className={classNames('gallery', compact && 'gallery--compact')}>
      <div className="gallery__stage">
        {images.map((img, i) => (
          <div key={img.view} className={classNames('gallery__slide', i === index && 'is-active')} aria-hidden={i !== index}>
            <Media
              src={img.src}
              tone={img.tone}
              motif={img.motif ?? motifFor(product.category)}
              alt={`${product.name}, ${img.view.toLowerCase()}`}
              label={img.view}
              eager={i === 0}
            />
          </div>
        ))}
        {many && (
          <>
            <button type="button" className="icon-btn gallery__arrow gallery__arrow--prev" onClick={() => go(-1)} aria-label="Previous image">
              <ChevronLeft size={18} strokeWidth={1.3} />
            </button>
            <button type="button" className="icon-btn gallery__arrow gallery__arrow--next" onClick={() => go(1)} aria-label="Next image">
              <ChevronRight size={18} strokeWidth={1.3} />
            </button>
          </>
        )}
      </div>
      {many && (
      <div className="gallery__thumbs" role="tablist" aria-label="Product images">
        {images.map((img, i) => (
          <button
            key={img.view}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={img.view}
            className={classNames('gallery__thumb', i === index && 'is-active')}
            onClick={() => setIndex(i)}
          >
            <Media src={img.src} tone={img.tone} motif={img.motif ?? motifFor(product.category)} alt="" showLabel={false} />
          </button>
        ))}
      </div>
      )}
    </div>
  );
}
