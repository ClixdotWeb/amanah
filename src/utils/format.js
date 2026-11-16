import { site } from '../data/site';

const formatter = new Intl.NumberFormat(site.currency.locale, {
  style: 'currency',
  currency: site.currency.code,
  maximumFractionDigits: 0,
});

export const formatPrice = (value) => formatter.format(value);

export const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).trim());
export const isValidPhone = (v) => /^[+\d][\d\s-]{6,}$/.test(String(v).trim());

export const classNames = (...c) => c.filter(Boolean).join(' ');
