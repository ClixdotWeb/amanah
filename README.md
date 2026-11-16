# Amanah Jewellery website

React + Vite storefront for AMANAH JEWELLERY: Handcrafted Designer Jewellery.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Replacing placeholders

The site was built before the brand PDFs were supplied, so some content is
temporary. Each item below is a single place to change.

| What | Where |
| --- | --- |
| Logo (done) | `public/brand/`: transparent ivory/burgundy/gold versions cut from `amanah-logo-original.png` (680×320). Replace them with SVG or high-res exports when available; `src/components/Logo.jsx` picks the file. |
| Campaign / editorial photos | copy into `public/images/`, set `src` in `src/data/media.js` |
| Product catalogue, prices, photos | `src/data/products.js` (all demo data) |
| Collections | `src/data/collections.js` |
| Email, phone, WhatsApp, address, social links | `src/data/site.js` |
| Brand fonts (if the logo presentation names others) | `--ff-display` / `--ff-body` in `src/styles/tokens.css` and the font link in `index.html` |
| Placeholder image labels | set `showImageLabels: false` in `src/data/site.js` |
| "Preview catalogue" notice | set `demoCatalogue: false` in `src/data/site.js` |

Anything with a `null` value in `site.js` is shown as "Coming soon" rather than invented.

## Backend hooks

`src/utils/api.js` is the only place the UI talks to data and services.

- `fetchProducts()` returns the local demo catalogue. Swap it for an API call.
- `placeOrder`, `sendContactMessage`, `subscribeNewsletter` POST to the endpoints in
  `site.endpoints`. While those are `null`, the forms clearly state the feature is not
  connected, and **no order, payment or message is reported as successful**.

No payment gateway is integrated.

## Structure

```
src/
  components/   Header, Footer, ProductCard, Gallery, overlays (cart drawer, quick view, search, toasts), UI primitives
  pages/        Home, Shop, Product, Collections, Cart, Checkout, About, Contact, Wishlist, Account, 404
  layouts/      MainLayout
  context/      StoreContext (cart + wishlist persisted to localStorage, toasts, overlay state)
  data/         site, media, collections, products
  hooks/        reveal-on-scroll, body scroll lock, scroll state
  utils/        api, formatting/validation, safe storage
  styles/       tokens, base, layout, components, home, pages
```
