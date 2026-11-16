import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, ShoppingBag } from 'lucide-react';
import { Monogram } from '../components/Logo';
import { PageHeader } from '../components/ui';
import { useStore } from '../context/StoreContext';
import { site } from '../data/site';

export default function Account() {
  const { cart, wishlist } = useStore();

  useEffect(() => {
    document.title = `Account | ${site.name}`;
  }, []);

  const tiles = [
    { to: '/cart', icon: ShoppingBag, title: 'Shopping bag', count: cart.count, unit: cart.count === 1 ? 'piece' : 'pieces' },
    { to: '/wishlist', icon: Heart, title: 'Wishlist', count: wishlist.length, unit: 'saved' },
  ];

  return (
    <>
      <PageHeader title="Your Amanah" crumbs={[{ label: 'Account' }]} />
      <section className="container acct page-pad-b">
        <div className="acct__hero">
          <Monogram tone="gold" className="acct__mark" />
          <div>
            <h2 className="acct__title">Customer accounts are coming soon</h2>
            <p className="acct__text">
              Sign-in and order history will be available once online ordering is live. Until then, your bag and wishlist are
              saved on this device.
            </p>
          </div>
        </div>

        <div className="acct__tiles">
          {tiles.map(({ to, icon: Icon, title, count, unit }) => (
            <Link key={to} to={to} className="acct__tile">
              <span className="acct__icon">
                <Icon size={20} strokeWidth={1.4} />
              </span>
              <span className="acct__info">
                <span className="acct__tile-title">{title}</span>
                <span className="acct__count">
                  <strong>{count}</strong> {unit}
                </span>
              </span>
              <ArrowRight size={18} strokeWidth={1.4} className="acct__arrow" />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
