import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Search, ShoppingBag, Trash2, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { getProductById, products } from '../data/products';
import { collections, getCollection } from '../data/collections';
import { site } from '../data/site';
import { useLockBody } from '../hooks/useLockBody';
import { classNames, formatPrice } from '../utils/format';
import Media from './Media';
import ProductGallery from './ProductGallery';
import PurchasePanel from './PurchasePanel';
import { motifFor } from './ProductCard';
import { EmptyState, Price, QtyStepper } from './ui';

/* ---------- Cart line (shared by drawer and cart page) ---------- */
export function CartLine({ item, onNavigate, large = false }) {
  const { updateQty, removeFromCart, maxQty } = useStore();
  const { product, variant, qty } = item;
  const url = `/product/${product.slug}`;
  return (
    <li className={classNames('line', large && 'line--lg')}>
      <Link to={url} className="line__img" onClick={onNavigate} tabIndex={-1} aria-hidden="true">
        <Media src={product.images[0].src} tone={product.images[0].tone} motif={motifFor(product.category)} alt="" showLabel={false} />
      </Link>
      <div className="line__info">
        <div className="line__top">
          <div>
            <p className="line__cat">{getCollection(product.category)?.name}</p>
            <h3 className="line__name">
              <Link to={url} onClick={onNavigate}>
                {product.name}
              </Link>
            </h3>
            {variant && (
              <p className="line__variant">
                {Object.entries(variant)
                  .map(([k, v]) => `${k}: ${v}`)
                  .join(' · ')}
              </p>
            )}
            {large && <p className="line__unit">{formatPrice(item.unitPrice)} each</p>}
          </div>
          <p className="line__total">{formatPrice(item.lineTotal)}</p>
        </div>
        <div className="line__bottom">
          <QtyStepper small value={qty} max={maxQty} onChange={(v) => updateQty(item.key, v)} />
          <button type="button" className="line__remove" onClick={() => removeFromCart(item.key)}>
            <Trash2 size={14} strokeWidth={1.3} /> Remove
          </button>
        </div>
      </div>
    </li>
  );
}

/* ---------- Cart drawer ---------- */
export function CartDrawer() {
  const { cart, cartOpen, setCartOpen } = useStore();
  const close = () => setCartOpen(false);
  useLockBody(cartOpen, close);
  const panelRef = useRef(null);
  useEffect(() => {
    if (cartOpen) panelRef.current?.focus();
  }, [cartOpen]);

  return (
    <div className={classNames('drawer', cartOpen && 'is-open')} aria-hidden={!cartOpen}>
      <div className="drawer__scrim" onClick={close} />
      <aside className="drawer__panel" role="dialog" aria-modal="true" aria-label="Shopping bag" tabIndex={-1} ref={panelRef}>
        <header className="drawer__head">
          <h2>
            Your bag <span className="drawer__count">({cart.count})</span>
          </h2>
          <button type="button" className="icon-btn" onClick={close} aria-label="Close bag">
            <X size={20} strokeWidth={1.3} />
          </button>
        </header>

        {cart.items.length === 0 ? (
          <div className="drawer__empty">
            <EmptyState
              icon={ShoppingBag}
              title="Your bag is empty"
              text="Discover pieces made to be treasured."
              action={
                <Link to="/shop" className="btn btn--primary" onClick={close}>
                  Shop the collection
                </Link>
              }
            />
          </div>
        ) : (
          <>
            <ul className="drawer__lines">
              {cart.items.map((item) => (
                <CartLine key={item.key} item={item} onNavigate={close} />
              ))}
            </ul>
            <footer className="drawer__foot">
              <div className="summary-row">
                <span>Subtotal</span>
                <strong>{formatPrice(cart.subtotal)}</strong>
              </div>
              <p className="drawer__note">{site.shippingNote}</p>
              <Link to="/checkout" className="btn btn--primary btn--block" onClick={close}>
                Proceed to checkout
              </Link>
              <Link to="/cart" className="btn btn--outline btn--block" onClick={close}>
                View bag
              </Link>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}

/* ---------- Quick view ---------- */
export function QuickView() {
  const { quickViewId, closeQuickView } = useStore();
  const product = quickViewId ? getProductById(quickViewId) : null;
  useLockBody(Boolean(product), closeQuickView);
  const ref = useRef(null);
  useEffect(() => {
    if (product) ref.current?.focus();
  }, [product]);

  if (!product) return null;
  return (
    <div className="modal is-open">
      <div className="modal__scrim" onClick={closeQuickView} />
      <div className="modal__panel quickview" role="dialog" aria-modal="true" aria-label={`Quick view: ${product.name}`} tabIndex={-1} ref={ref}>
        <button type="button" className="icon-btn modal__close" onClick={closeQuickView} aria-label="Close quick view">
          <X size={20} strokeWidth={1.3} />
        </button>
        <ProductGallery product={product} compact key={product.id} />
        <div className="quickview__info">
          <p className="eyebrow">{getCollection(product.category)?.name}</p>
          <h2 className="quickview__name">{product.name}</h2>
          <Price product={product} className="price--lg" />
          <p className="quickview__desc">{product.short}</p>
          <PurchasePanel product={product} onDone={closeQuickView} key={product.id} />
          <Link to={`/product/${product.slug}`} className="text-link" onClick={closeQuickView}>
            View full details <ArrowRight size={15} strokeWidth={1.3} />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ---------- Search ---------- */
export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const close = () => setSearchOpen(false);
  useLockBody(searchOpen, close);

  useEffect(() => {
    if (searchOpen) {
      setQ('');
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [searchOpen]);

  const term = q.trim();
  const results = useMemo(() => {
    const t = term.toLowerCase();
    if (t.length < 2) return [];
    // Match the start of words, so "ring" finds rings but not "earrings".
    const escaped = t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const wordStart = new RegExp(`\\b${escaped}`, 'i');
    return products
      .filter((p) => wordStart.test(`${p.name} ${p.category} ${getCollection(p.category)?.name}`))
      .slice(0, 5);
  }, [term]);

  const submit = (e) => {
    e?.preventDefault();
    if (!term) return;
    close();
    navigate(`/shop?q=${encodeURIComponent(term)}`);
  };

  const goCollection = (id) => {
    close();
    navigate(`/shop?category=${id}`);
  };

  return (
    <div className={classNames('search', searchOpen && 'is-open')} aria-hidden={!searchOpen}>
      <div className="search__scrim" onClick={close} />
      <div className="search__panel" role="dialog" aria-modal="true" aria-label="Search">
        <div className="search__card">
          <form className="search__form" onSubmit={submit} role="search">
            <span className="search__icon" aria-hidden="true">
              <Search size={18} strokeWidth={1.5} />
            </span>
            <label htmlFor="site-search" className="sr-only">
              Search jewellery
            </label>
            <input
              id="site-search"
              ref={inputRef}
              type="search"
              placeholder="Search necklaces, rings, earrings…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              autoComplete="off"
            />
            {q && (
              <button type="button" className="search__clear" onClick={() => setQ('')}>
                Clear
              </button>
            )}
          </form>
          <button type="button" className="search__close" onClick={close} aria-label="Close search">
            <X size={18} strokeWidth={1.5} />
          </button>

          <div className="search__body">
            {term.length < 2 ? (
              <>
                <p className="search__label">Browse collections</p>
                <div className="search__chips">
                  {collections.map((c) => (
                    <button key={c.id} type="button" className="search__chip" onClick={() => goCollection(c.id)}>
                      {c.name}
                    </button>
                  ))}
                </div>
              </>
            ) : results.length === 0 ? (
              <p className="search__none">
                No pieces match “{term}”. Try another word, such as “ring” or “pendant”.
              </p>
            ) : (
              <>
                <p className="search__label">Pieces</p>
                <ul className="search__list">
                  {results.map((p) => (
                    <li key={p.id}>
                      <Link to={`/product/${p.slug}`} onClick={close} className="search__item">
                        <span className="search__thumb">
                          <Media src={p.images[0].src} tone={p.images[0].tone} motif={motifFor(p.category)} alt="" showLabel={false} />
                        </span>
                        <span className="search__text">
                          <span className="search__name">{p.name}</span>
                          <span className="search__cat">{getCollection(p.category)?.name}</span>
                        </span>
                        <span className="search__price">{formatPrice(p.salePrice ?? p.price)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <button type="button" className="search__all" onClick={submit}>
                  See all results for “{term}” <ArrowRight size={14} strokeWidth={1.5} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Toasts ---------- */
export function Toasts() {
  const { toasts, dismissToast } = useStore();
  return (
    <div className="toasts" aria-live="polite" aria-atomic="false">
      {toasts.map((t) => (
        <div key={t.id} className={classNames('toast', `toast--${t.tone}`)}>
          <p>{t.message}</p>
          {t.action && (
            <button
              type="button"
              className="toast__action"
              onClick={() => {
                t.action.onClick();
                dismissToast(t.id);
              }}
            >
              {t.action.label}
            </button>
          )}
          <button type="button" className="toast__close" onClick={() => dismissToast(t.id)} aria-label="Dismiss">
            <X size={14} strokeWidth={1.4} />
          </button>
        </div>
      ))}
    </div>
  );
}
