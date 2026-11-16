import { useHeroScroll } from '../hooks/useHeroScroll';
import { Link } from 'react-router-dom';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { classNames, formatPrice } from '../utils/format';

/** Fades and lifts its content in once it scrolls into view. */
export function Reveal({ as: Tag = 'div', className, delay = 0, children, ...rest }) {
  const ref = useReveal();
  return (
    <Tag
      ref={ref}
      className={classNames('reveal', className)}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({ eyebrow, title, intro, link, align = 'split', light = false }) {
  return (
    <div className={classNames('section-head', `section-head--${align}`, light && 'section-head--light')}>
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="section-title">{title}</h2>
        {intro && <p className="section-intro">{intro}</p>}
      </div>
      {link && (
        <Link to={link.to} className="btn btn--outline btn--sm section-head__btn">
          {link.label} <ArrowRight size={15} strokeWidth={1.3} />
        </Link>
      )}
    </div>
  );
}

export function PageHeader({ eyebrow, title, intro, crumbs = [] }) {
  const heroRef = useHeroScroll();
  return (
    <header className="page-header" ref={heroRef}>
      <div className="container">
        <nav aria-label="Breadcrumb" className="crumbs">
          <Link to="/">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label}>
              <span aria-hidden="true" className="crumbs__sep">/</span>
              {c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
            </span>
          ))}
        </nav>
        <h1 className="page-title">{title}</h1>
        {intro && <p className="page-intro">{intro}</p>}
      </div>
    </header>
  );
}

export function QtyStepper({ value, onChange, min = 1, max = 10, small = false }) {
  return (
    <div className={classNames('qty', small && 'qty--sm')} role="group" aria-label="Quantity">
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Decrease quantity">
        <Minus size={14} strokeWidth={1.4} />
      </button>
      <span aria-live="polite">{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="Increase quantity">
        <Plus size={14} strokeWidth={1.4} />
      </button>
    </div>
  );
}

export function Price({ product, className }) {
  if (product.salePrice != null) {
    return (
      <p className={classNames('price', className)}>
        <span className="price__sale">{formatPrice(product.salePrice)}</span>
        <s className="price__was">
          <span className="sr-only">Was </span>
          {formatPrice(product.price)}
        </s>
      </p>
    );
  }
  return <p className={classNames('price', className)}>{formatPrice(product.price)}</p>;
}

export function VariantPicker({ variants, value, onChange }) {
  return variants.map((v) => (
    <fieldset className="variant" key={v.name}>
      <legend>
        {v.name}
        {value[v.name] && <span className="variant__chosen">: {value[v.name]}</span>}
      </legend>
      <div className="variant__options">
        {v.options.map((o) => (
          <button
            key={o}
            type="button"
            className={classNames('chip', value[v.name] === o && 'is-active')}
            aria-pressed={value[v.name] === o}
            onClick={() => onChange({ ...value, [v.name]: o })}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  ));
}

export function EmptyState({ icon: Icon, title, text, action }) {
  return (
    <div className="empty">
      {Icon && (
        <span className="empty__icon">
          <Icon size={26} strokeWidth={1.1} />
        </span>
      )}
      <h2 className="empty__title">{title}</h2>
      {text && <p className="empty__text">{text}</p>}
      {action}
    </div>
  );
}

export function Notice({ tone = 'info', title, children }) {
  return (
    <div className={classNames('notice', `notice--${tone}`)} role={tone === 'error' ? 'alert' : 'status'}>
      {title && <p className="notice__title">{title}</p>}
      <div className="notice__body">{children}</div>
    </div>
  );
}

export function Field({ label, error, id, children, hint, optional }) {
  return (
    <div className={classNames('field', error && 'has-error')}>
      <label htmlFor={id}>
        {label}
        {optional && <span className="field__opt"> (optional)</span>}
      </label>
      {children}
      {hint && !error && <p className="field__hint">{hint}</p>}
      {error && (
        <p className="field__error" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
