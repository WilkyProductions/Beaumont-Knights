# Beaumont Knights Baseball

Website for Beaumont Knights Baseball, a non-profit 9U/10U youth travel
baseball club in Beaumont, CA.

The full design system, content plan, and feature specs live in
[SITE-PLAN.md](SITE-PLAN.md) — read that first. This codebase implements it.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4 (brand tokens in `src/app/globals.css`)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `src/data/` — single source of truth for org facts, schedule, board/coach
  bios, FAQ, and news content (referenced by both page copy and JSON-LD
  structured data, per SITE-PLAN.md §9)
- `src/components/` — shared UI (nav, footer, buttons, event cards)
- `src/lib/` — calendar (.ics) generation and JSON-LD helpers
- `src/app/` — routes, one folder per page in the sitemap (SITE-PLAN.md §4)

## Known placeholders before launch

See SITE-PLAN.md §14–15 for the full list. In short: real season dates, the
confirmed registration fee, real board/coach names and photos, the
non-profit EIN, the actual crest/logo artwork files (drop into `/public`
and swap into `ShieldMark`/favicon), and wiring `/api/signup` and
`/api/contact` to real storage/email instead of just logging.

## Deploying

Push to GitHub and import the repo in Vercel — see SITE-PLAN.md §10–11 for
the recommended hosting/domain setup (`beaumontknights.com`).
