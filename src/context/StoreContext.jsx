import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { getProductById, effectivePrice } from '../data/products';
import { readStorage, writeStorage } from '../utils/storage';

const CART_KEY = 'amanah.cart.v1';
const WISHLIST_KEY = 'amanah.wishlist.v1';
const MAX_QTY = 10;

const StoreContext = createContext(null);

const lineKey = (id, variant) => `${id}|${variant ? JSON.stringify(variant) : ''}`;

export function StoreProvider({ children }) {
  // Cart lines: { key, id, variant: {name: option} | null, qty }
  const [cartLines, setCartLines] = useState(() =>
    readStorage(CART_KEY, []).filter((l) => getProductById(l.id)),
  );
  const [wishlist, setWishlist] = useState(() =>
    readStorage(WISHLIST_KEY, []).filter((id) => getProductById(id)),
  );
  const [toasts, setToasts] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickViewId, setQuickViewId] = useState(null);
  const toastId = useRef(0);

  useEffect(() => writeStorage(CART_KEY, cartLines), [cartLines]);
  useEffect(() => writeStorage(WISHLIST_KEY, wishlist), [wishlist]);

  // Keep tabs in sync.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === CART_KEY) setCartLines(readStorage(CART_KEY, []));
      if (e.key === WISHLIST_KEY) setWishlist(readStorage(WISHLIST_KEY, []));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const notify = useCallback(
    (message, { tone = 'default', action } = {}) => {
      const id = ++toastId.current;
      setToasts((t) => [...t.slice(-2), { id, message, tone, action }]);
      setTimeout(() => dismissToast(id), 3800);
    },
    [dismissToast],
  );

  const addToCart = useCallback(
    (id, { variant = null, qty = 1, silent = false } = {}) => {
      const product = getProductById(id);
      if (!product) return false;
      if (!product.inStock) {
        notify(`${product.name} is currently sold out.`, { tone: 'error' });
        return false;
      }
      const key = lineKey(id, variant);
      setCartLines((lines) => {
        const existing = lines.find((l) => l.key === key);
        if (existing) {
          return lines.map((l) =>
            l.key === key ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l,
          );
        }
        return [...lines, { key, id, variant, qty: Math.min(MAX_QTY, qty) }];
      });
      if (!silent) {
        notify(`${product.name} was added to your bag.`, {
          action: { label: 'View bag', onClick: () => setCartOpen(true) },
        });
      }
      return true;
    },
    [notify],
  );

  const updateQty = useCallback((key, qty) => {
    setCartLines((lines) =>
      lines.map((l) => (l.key === key ? { ...l, qty: Math.max(1, Math.min(MAX_QTY, qty)) } : l)),
    );
  }, []);

  const removeFromCart = useCallback(
    (key) => {
      const line = cartLines.find((l) => l.key === key);
      if (!line) return;
      setCartLines((lines) => lines.filter((l) => l.key !== key));
      notify(`${getProductById(line.id)?.name ?? 'Item'} was removed from your bag.`);
    },
    [cartLines, notify],
  );

  const toggleWishlist = useCallback(
    (id) => {
      const name = getProductById(id)?.name ?? 'Item';
      if (wishlist.includes(id)) {
        setWishlist((list) => list.filter((x) => x !== id));
        notify(`${name} was removed from your wishlist.`);
      } else {
        setWishlist((list) => (list.includes(id) ? list : [...list, id]));
        notify(`${name} was saved to your wishlist.`);
      }
    },
    [wishlist, notify],
  );

  const cart = useMemo(() => {
    const items = cartLines
      .map((l) => {
        const product = getProductById(l.id);
        return product ? { ...l, product, unitPrice: effectivePrice(product), lineTotal: effectivePrice(product) * l.qty } : null;
      })
      .filter(Boolean);
    return {
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: items.reduce((n, i) => n + i.lineTotal, 0),
    };
  }, [cartLines]);

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart: () => setCartLines([]),
      maxQty: MAX_QTY,
      wishlist,
      isWishlisted: (id) => wishlist.includes(id),
      toggleWishlist,
      toasts,
      notify,
      dismissToast,
      cartOpen,
      setCartOpen,
      searchOpen,
      setSearchOpen,
      quickViewId,
      openQuickView: setQuickViewId,
      closeQuickView: () => setQuickViewId(null),
    }),
    [cart, addToCart, updateQty, removeFromCart, wishlist, toggleWishlist, toasts, notify, dismissToast, cartOpen, searchOpen, quickViewId], // eslint-disable-line react-hooks/exhaustive-deps
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}
