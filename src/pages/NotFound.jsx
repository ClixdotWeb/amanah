import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { site } from '../data/site';

export default function NotFound() {
  useEffect(() => {
    document.title = `Page not found | ${site.name}`;
  }, []);
  return (
    <section className="notfound container">
      <p className="notfound__code">404</p>
      <h1 className="page-title">This page could not be found</h1>
      <p className="page-intro">The link may be broken, or the page may have moved.</p>
      <div className="btn-row">
        <Link to="/" className="btn btn--primary">
          Back to home
        </Link>
        <Link to="/shop" className="btn btn--outline">
          Shop the collection
        </Link>
      </div>
    </section>
  );
}
