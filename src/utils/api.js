/**
 * Data and service layer. The UI only talks to these functions, so a real
 * backend or admin dashboard can be connected here without changing pages.
 */
import { products } from '../data/products';
import { site } from '../data/site';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export async function fetchProducts() {
  // Replace with a real request, e.g. `return (await fetch('/api/products')).json();`
  await wait(350);
  return products;
}

export class NotConfiguredError extends Error {
  constructor(feature) {
    super(`${feature} is not connected yet.`);
    this.name = 'NotConfiguredError';
    this.feature = feature;
  }
}

async function post(endpoint, feature, payload) {
  if (!endpoint) throw new NotConfiguredError(feature);
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Request failed (${res.status}). Please try again.`);
  return res.json().catch(() => ({}));
}

// No payment gateway is configured. While `site.endpoints.orders` is null this
// always throws NotConfiguredError, so no order is ever reported as placed.
export const placeOrder = (order) => post(site.endpoints.orders, 'Online ordering', order);
export const sendContactMessage = (msg) => post(site.endpoints.contact, 'The contact form', msg);
export const subscribeNewsletter = (email) => post(site.endpoints.newsletter, 'Newsletter sign-up', { email });
