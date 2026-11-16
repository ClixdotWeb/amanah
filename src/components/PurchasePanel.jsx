import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { classNames } from '../utils/format';
import { QtyStepper, VariantPicker } from './ui';

/** Variant choice, quantity, Add to bag, Buy now and wishlist. Shared by the product page and Quick View. */
export default function PurchasePanel({ product, onDone }) {
  const { addToCart, toggleWishlist, isWishlisted, maxQty, setCartOpen } = useStore();
  const navigate = useNavigate();
  const [choice, setChoice] = useState({});
  const [qty, setQty] = useState(1);
  const [error, setError] = useState('');
  const saved = isWishlisted(product.id);

  const missing = product.variants.filter((v) => !choice[v.name]).map((v) => v.name.toLowerCase());

  const commit = () => {
    if (missing.length) {
      setError(`Please choose a ${missing.join(' and ')}.`);
      return false;
    }
    setError('');
    const variant = product.variants.length ? choice : null;
    return addToCart(product.id, { variant, qty, silent: true });
  };

  const onAdd = () => {
    if (commit()) {
      onDone?.();
      setCartOpen(true);
    }
  };

  const onBuy = () => {
    if (commit()) {
      onDone?.();
      navigate('/checkout');
    }
  };

  return (
    <div className="purchase">
      {product.variants.length > 0 && (
        <VariantPicker
          variants={product.variants}
          value={choice}
          onChange={(v) => {
            setChoice(v);
            setError('');
          }}
        />
      )}

      {/* One row: quantity, Add to bag, wishlist */}
      <div className="purchase__row">
        <QtyStepper value={qty} onChange={(v) => setQty(Math.max(1, Math.min(maxQty, v)))} max={maxQty} />
        <button type="button" className="btn btn--primary purchase__add" onClick={onAdd} disabled={!product.inStock}>
          {product.inStock ? 'Add to bag' : 'Sold out'}
        </button>
        <button
          type="button"
          className={classNames('icon-btn icon-btn--bordered', saved && 'is-active')}
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={saved}
          aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart size={18} strokeWidth={1.3} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>

      {error && (
        <p className="field__error" role="alert">
          {error}
        </p>
      )}

      {product.inStock ? (
        <button type="button" className="purchase__buy" onClick={onBuy}>
          Or buy now <ArrowRight size={14} strokeWidth={1.4} />
        </button>
      ) : (
        <p className="purchase__note">This piece is currently unavailable. Save it to your wishlist to find it again later.</p>
      )}
    </div>
  );
}
