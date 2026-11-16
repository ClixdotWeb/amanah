import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { EmptyState, PageHeader } from '../components/ui';
import { useStore } from '../context/StoreContext';
import { getProductById } from '../data/products';
import { site } from '../data/site';

export default function Wishlist() {
  const { wishlist } = useStore();
  const items = wishlist.map(getProductById).filter(Boolean);

  useEffect(() => {
    document.title = `Wishlist | ${site.name}`;
  }, []);

  return (
    <>
      <PageHeader eyebrow="Saved for later" title="Wishlist" crumbs={[{ label: 'Wishlist' }]} />
      <section className="container page-pad-b">
        {items.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="Your wishlist is empty"
            text="Tap the heart on any piece to save it here."
            action={
              <Link to="/shop" className="btn btn--primary">
                Discover the collection
              </Link>
            }
          />
        ) : (
          <div className="product-grid product-grid--4">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
