# CLAUDE.md

Shopify Hydrogen (React Router 7 + Vite + Tailwind v4, TypeScript) storefront for
a 3-day Sahara desert tour (Marrakech → Merzouga). This is the active project; the
sibling `../chollodesierto.com` is an older landing-page-only version — don't work there.

## Commands

- `npm run dev` — dev server on port 4050 (with codegen)
- `npm run build` / `npm run typecheck` / `npm run lint`

## Layout

- Routes: `app/routes/` — `_index`, `booking`, `about`, `contact`, `faq`, `reviews`, `blog._index`, `blog.$handle`
- Booking form: `app/components/BookingBody.tsx` (steps, pricing, cart lines)
- Flow: home → `/booking` → route `action` creates a cart → redirect to Shopify checkout (no cart page/drawer)
- UI copy goes through `t('key', 'English fallback')`; keys/baseline in `app/lib/ui-strings.ts`, `data/en-baseline.json`, `scripts/organize-schema.mjs`

## Content model

- Tour routes, camp tiers, FAQs, reviews come from Shopify metaobjects (`app/lib/queries.ts`).
  Every query is `.catch(() => null)` and components fall back to hardcoded constants,
  so the site renders the same whether or not Shopify returns data.
- Route ids: `classic-loop`, `grand-crossing`, `reverse-crossing`. Camp ids: `shared`, `comfort`, `superior`.
- See `MIGRATION-STATUS.md` (current state, blockers, live Shopify ids) and `DATA-SCHEMA.md` (target schema) before content/commerce work.

## Known state

- Metaobject content is staged in `data/metaobject-entries.json` but not yet written to Shopify.
- Products exist as DRAFT; the storefront token is wrong, so the checkout success redirect is unverified.
