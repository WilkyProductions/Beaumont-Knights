# Design Source

Raw, print-resolution brand artwork (15-20MB each) — kept here rather than
in `/public` since that folder is served as-is on the live site and these
are far too large for the web.

- `BEAUMONT KNIGHTS EMBLEM 1  (11 inch WHT FAB).jpg` — the official crest
  (knight + shield + wordmark + BASEBALL plate).
- `BeaumontKnightsCanopy.jpg` — the team canopy artwork/mockup.

Run `node scripts/process-logo.mjs` from the repo root to regenerate the
optimized, background-removed web assets in `public/logo/` and the app
icons in `src/app/` from these sources.
