import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header, { AnnouncementBar } from '../components/Header';
import Footer from '../components/Footer';
import { CartDrawer, QuickView, SearchOverlay, Toasts } from '../components/Overlays';
import { useStore } from '../context/StoreContext';

export default function MainLayout() {
  const { pathname, search } = useLocation();
  const { closeQuickView, setCartOpen, setSearchOpen } = useStore();
  const isHome = pathname === '/';

  // Scroll to top and close any overlay on page change.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    closeQuickView();
    setSearchOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    setCartOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, search]);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <AnnouncementBar />
      <Header overlay={isHome} />
      <main id="main" className={isHome ? 'main main--home' : 'main'} key={pathname}>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <QuickView />
      <SearchOverlay />
      <Toasts />
    </>
  );
}
