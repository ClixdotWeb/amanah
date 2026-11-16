import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { getCollection } from '../data/collections';
import { classNames, formatPrice } from '../utils/format';
import Media from './Media';

/**
 * Product card: burgundy card, rounded photo, a thin collection band,
 * then name | price + action.
 */
export default function ProductCard({ product, eager = false }) {
  const { addToCart, toggleWishlist, isWishlisted, openQuickView } = useStore();
  const saved = isWishlisted(product.id);
  const needsOptions = product.variants.length > 0;
  const url = `/product/${product.slug}`;
  const [front, , worn] = product.images;
  const onSale = product.salePrice != null;

  const onAdd = () => {
    if (needsOptions) openQuickView(product.id);
    else addToCart(product.id);
  };

  return (
    <article className={classNames('pcard', !product.inStock && 'is-soldout')}>
      <div className="pcard__media">
        <Link to={url} className="pcard__imglink" tabIndex={-1} aria-hidden="true">
          <Media src={front.src} tone={front.tone} motif={motifFor(product.category)} alt="" eager={eager} showLabel={false} />
          {worn.src && <Media src={worn.src} tone="deep" motif={motifFor(product.category)} alt="" className="pcard__alt" showLabel={false} />}
        </Link>

        <div className="pcard__badges">
          {!product.inStock && <span className="badge badge--muted">Sold out</span>}
          {product.inStock && onSale && <span className="badge">Sale</span>}
          {product.inStock && product.isNew && !onSale && <span className="badge badge--light">New</span>}
        </div>

        <div className="pcard__actions">
          <button
            type="button"
            className={classNames('pcard__icon', saved && 'is-active')}
            onClick={() => toggleWishlist(product.id)}
            aria-pressed={saved}
            aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          >
            <Heart size={17} strokeWidth={1.4} fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      <div className="pcard__body">
        <h3 className="pcard__name" title={product.name}>
          <Link to={url}>{product.name}</Link>
        </h3>
        <p className="pcard__cat">{getCollection(product.category)?.name}</p>

        <div className="pcard__foot">
          <p className="pcard__price">
            {onSale && (
              <s className="pcard__was">
                <span className="sr-only">Was </span>
                {formatPrice(product.price)}
              </s>
            )}
            <span className="pcard__now">{formatPrice(onSale ? product.salePrice : product.price)}</span>
          </p>
          <button
            type="button"
            className="pcard__bag"
            onClick={onAdd}
            disabled={!product.inStock}
            aria-label={!product.inStock ? `${product.name} is sold out` : needsOptions ? `Choose options for ${product.name}` : `Add ${product.name} to bag`}
            title={!product.inStock ? 'Sold out' : needsOptions ? 'Choose options' : 'Add to bag'}
          >
            <ShoppingBag size={20} strokeWidth={1.4} />
          </button>
        </div>
      </div>
    </article>
  );
}

export function motifFor(category) {
  return (
    { necklaces: 'necklace', earrings: 'earrings', rings: 'ring', bracelets: 'bracelet', designer: 'designer' }[category] ??
    'monogram'
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="pcard pcard--skeleton" aria-hidden="true">
      <div className="pcard__media skeleton" />
      <div className="pcard__body">
        <span className="skeleton skeleton--line" style={{ width: '70%' }} />
        <span className="skeleton skeleton--line" style={{ width: '30%' }} />
      </div>
    </div>
  );
}
