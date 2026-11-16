import { Link } from 'react-router-dom';
import { classNames } from '../utils/format';

/**
 * Official AMANAH logo (public/brand). Files were cut from the supplied artwork
 * onto a transparent background; proportions are untouched. Only height is set in CSS.
 *
 * tone: 'ivory' for dark backgrounds, 'burgundy' for light ones.
 * full: include the "Handcrafted Designer Jewellery" tagline (for large sizes,
 *       where it stays legible).
 */
export default function Logo({ tone = 'burgundy', full = false, className, onClick }) {
  const file = `/brand/logo-${full ? 'full-' : ''}${tone}.png`;
  return (
    <Link to="/" className={classNames('logo', full && 'logo--full', className)} onClick={onClick}>
      <img src={file} alt="Amanah Jewellery" className="logo__img" width={550} height={163} />
    </Link>
  );
}

/** Official AMANAH monogram mark. tone: 'burgundy' | 'ivory' | 'gold'. */
export function Monogram({ tone = 'burgundy', className }) {
  return (
    <img
      src={`/brand/mark-${tone}.png`}
      alt=""
      aria-hidden="true"
      className={classNames('monogram', className)}
      width={153}
      height={162}
    />
  );
}
