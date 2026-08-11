# Beaumont Knights Baseball

Website for Beaumont Knights Baseball, a non-profit 9U/10U youth travel
baseball club in Beaumont, CA.

The full design system, content plan, and feature specs live in
[SITE-PLAN.md](SITE-PLAN.md) — read that first. This codebase implements it.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4 (brand tokens in `src/app/globals.css`)
- [Sanity](https://sanity.io) — content management for the schedule, roster,
  and gallery (see below)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `src/data/` — org facts, FAQ, news, board bios, and the placeholder
  schedule used as a fallback until Sanity is configured (referenced by
  both page copy and JSON-LD structured data, per SITE-PLAN.md §9)
- `src/sanity/` — schemas, GROQ queries, and the client for the CMS-backed
  content (events, roster, gallery photos)
- `src/components/` — shared UI (nav, footer, buttons, event cards)
- `src/lib/` — calendar (.ics) generation and JSON-LD helpers
- `src/app/(site)/` — every public page, wrapped in the site's Nav/Footer
  layout (SITE-PLAN.md §4)
- `src/app/studio/` — the embedded Sanity Studio, at `/studio`, deliberately
  outside the `(site)` route group so it isn't wrapped in the site chrome

## Content management (Sanity)

The coach/board can edit **events** (schedule), **roster players**, and
**gallery photos** at `/studio` — a real form-based editor, no code or git
required. Until it's configured, the site quietly falls back to the
placeholder data in `src/data/schedule.ts` (and empty states for
roster/gallery), so nothing breaks in the meantime.

To turn it on:

1. Create a free project at [sanity.io/manage](https://www.sanity.io/manage)
   (or run `npx sanity@latest init` from the repo root and follow the
   prompts — either way you'll need to sign in with a Google/GitHub/email
   account, which is why this step can't be scripted).
2. Copy `.env.example` to `.env.local` and fill in the `NEXT_PUBLIC_SANITY_PROJECT_ID`
   it gives you (dataset is `production` by default).
3. Add the same two variables in Vercel → Project Settings → Environment
   Variables, then redeploy.
4. Invite the coach as a project member (Editor role is enough) from the
   Sanity manage dashboard, under the project's "Members" tab.
5. Visit `/studio` on the live site, log in, and start adding events,
   roster players, and photos.

Schema definitions live in `src/sanity/schemaTypes/`; the fetch/fallback
logic is in `src/sanity/queries.ts`.

## Known placeholders before launch

See SITE-PLAN.md §14–15 for the full list. In short: real season dates, the
confirmed registration fee, real board/coach names and photos, the
non-profit EIN, the actual crest/logo artwork files (drop into `/public`
and swap into `ShieldMark`/favicon), and wiring `/api/signup` and
`/api/contact` to real storage/email instead of just logging.

## Deploying

Push to GitHub and import the repo in Vercel — see SITE-PLAN.md §10–11 for
the recommended hosting/domain setup (`beaumontknights.com`).
