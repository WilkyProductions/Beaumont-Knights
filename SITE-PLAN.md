# Beaumont Knights Baseball — Website Plan

**Status:** Draft v1 — foundation document for all future development
**Owner:** Beaumont Knights Baseball (non-profit youth travel baseball, Beaumont, CA — 9U & 10U)
**Purpose:** This document is the single source of truth for the site's design system, content, features, and technical approach. Every page, component, and deployment should trace back to this plan. Update this file first when scope changes; code follows the doc, not the other way around.

---

## 1. Project Overview

| | |
|---|---|
| **Organization** | Beaumont Knights Baseball |
| **Type** | 501(c)(3) non-profit youth travel baseball club |
| **Divisions** | 9U and 10U (expandable later — build data model to allow adding divisions without a redesign) |
| **Location** | Beaumont, CA (Riverside County / Inland Empire) |
| **Primary audience** | Parents of 9–10 year-olds researching or joining a travel team, on their phones |
| **Social** | Instagram: [@beaumontknights_92223](https://instagram.com/beaumontknights_92223) |
| **Vibe** | Tough-but-welcoming knight/armor brand on the outside, warm and fun on the inside. Parents should feel "this is a serious, well-run program" *and* "my kid is going to have a blast and be welcomed here."

### Goals for the site
1. Convert curious parents into tryout sign-ups and program inquiries.
2. Be the single, trustworthy source for the schedule — tryouts, practices, games — so nobody misses one.
3. Feel unmistakably "Beaumont Knights" the instant it loads, on a phone, in under 2 seconds.
4. Rank on Google for local youth baseball searches AND surface correctly in AI answers (ChatGPT, Google AI Overviews, Perplexity, etc.) when parents ask things like "youth travel baseball Beaumont CA."
5. Support the org's non-profit needs: donations, sponsor recognition, volunteer/board transparency.

---

## 2. Brand & Design System

Derived from the team canopy artwork and primary crest logo. Treat this section as the design tokens for the whole build — every component should pull from here rather than inventing new colors/type on the fly.

### 2.1 Color palette

The brand is **dark base + metallic gold**, with silver-white for high-contrast headline text. These hex values are sampled/estimated from the artwork — swap in exact values if a brand style guide or original vector/AI file exists.

| Token | Hex (approx.) | Usage |
|---|---|---|
| `--knight-black` | `#0A0A0B` | Primary background (near-black, not pure `#000` — keeps depth in photos/gradients) |
| `--knight-charcoal` | `#1A1A1C` | Secondary surface (cards, nav bar, form fields) |
| `--knight-gold` | `#D8A02F` | Primary brand gold — buttons, borders, key headlines |
| `--knight-gold-bright` | `#F4C24D` | Hover states, highlights, icon accents, gradient top-stop |
| `--knight-gold-deep` | `#9C6F1E` | Gradient bottom-stop, shadows on gold elements |
| `--knight-silver` | `#EDEDEA` | Body copy on dark backgrounds, "BEAUMONT"-style lettering |
| `--knight-steel` | `#59595C` | Lightning-crack/texture graphics, dividers, muted secondary text |
| `--knight-white` | `#FFFFFF` | Rare high-emphasis use only (avoid overusing pure white — it reads flat against the gold) |

**Gradients:** Gold elements (buttons, headline strokes, dividers) should use a subtle linear gradient from `--knight-gold-bright` → `--knight-gold` → `--knight-gold-deep` to replicate the metallic-foil look in the logo, not flat gold fills.

**Contrast rule:** Body text is always `--knight-silver` or white on `--knight-black`/`--knight-charcoal`, never gold-on-black for long text (fails legibility/WCAG at small sizes). Gold is for headlines, accents, icons, borders, and short CTAs only.

### 2.2 Typography

- **Display / headlines:** A bold, condensed collegiate-athletic serif or slab (the crest uses a distressed collegiate serif for "BEAUMONT" and a heavy condensed sans for "KNIGHTS"). Suggested pairing: `Anton` or `Oswald` (condensed, heavy) for "KNIGHTS"-style impact headers, paired with a collegiate serif like `Rye` or a licensed equivalent of the crest font for hero moments.
- **Script accent:** A hand-script font (matching the cursive "Knights" wordmark on the canopy) used *sparingly* — hero taglines, section dividers, "Welcome to the Family" style moments. Suggested: `Alex Brush` or `Dancing Script`.
- **Body copy:** A clean, highly legible sans-serif for mobile reading — `Inter` or `Public Sans`. Never use the display/script fonts for paragraph text or form labels.
- **Sizing:** Mobile-first scale, minimum 16px body text (prevents iOS auto-zoom on form inputs), headlines scale up via `clamp()` rather than fixed breakpoints.

### 2.3 Imagery & motifs

- **Crest/mascot:** The armored knight batter crest is the primary logo — use as favicon, nav mark, and hero anchor. Always keep clear space around it; never stretch or recolor it.
- **Lightning-crack texture:** Gray jagged lightning bolts + crack lines from the canopy are a secondary background texture — use behind hero sections and section breaks at low opacity, not as a foreground element competing with content.
- **Ice cream drip & waffle cone:** This is the "fun/welcoming" counterweight to the tougher knight-armor identity. Use it deliberately, not everywhere, so the two languages don't fight:
  - A gold "drip" edge (like melting ice cream) as a decorative bottom border under the hero section, section dividers, or card tops.
  - Waffle-cone texture/pattern reserved for playful, kid-facing moments: a "Meet the Team" or "Fan Zone" section, birthday/team-bonding event photos, concession stand/snack shack info, or celebratory sign-up confirmation screens.
  - Never mix the drip motif into serious/formal content (registration legal text, board/financial info) — keep those clean and dark-gold-only.
- **Photography:** Real photos of the actual kids/team (once available) should dominate over stock photography — action shots, team huddles, families in the stands. Warm, high-contrast editing that holds up against the dark background (avoid washed-out photos floating on black).

### 2.4 Iconography & UI elements
- Rounded-but-sturdy icon style (not overly playful/cartoonish, not overly corporate).
- Buttons: gold gradient fill with dark text for primary CTAs (e.g., "Register for Tryouts"); outlined gold-on-dark for secondary actions.
- Cards/panels: `--knight-charcoal` surface, thin gold or steel border, subtle shadow — echoes the shield shape from the crest where natural (rounded-square with slightly angled top corners, used sparingly for feature callouts).

---

## 3. Voice & Tone

- **Welcoming first, competitive second.** Copy should read like a coach greeting a new family at the fence, not a corporate program brochure.
- Short sentences. Parents are reading on a phone, often one-handed, often with a kid tugging their sleeve.
- Avoid jargon a first-time baseball parent wouldn't know; explain terms like "9U," "travel ball," and "tryouts vs. evaluations" plainly.
- Non-profit honesty: be transparent and warm about fundraising/donations — "help us keep this affordable for every family," not a hard sales pitch.

---

## 4. Sitemap

```
/                      Home
/about                 About the Knights (mission, history, non-profit status, coaches/board)
/teams                 9U & 10U team pages (roster, coaches, team-specific info)
  /teams/9u
  /teams/10u
/schedule              Full events calendar — tryouts, practices, games, tournaments
/tryouts               Tryout info, requirements, what to bring, dates (deep-links from /schedule)
/signup                Registration / interest form (parent + player info)
/sponsors              Sponsor recognition + sponsorship packages
/donate                Donation info (non-profit giving, what it funds)
/gallery               Photos/videos, Instagram feed embed
/news                  Announcements, season updates, blog-style posts (also powers SEO/AI-search content)
/faq                   Frequently asked questions (also structured for AI search — see §9)
/contact               Contact form, board/staff contacts, location info
```

**Mobile nav:** Hamburger menu with the crest logo centered, sticky top bar. Bottom-fixed "Register / Tryout" CTA button persists across all pages on mobile (thumb-reachable, gold, always visible).

---

## 5. Page-by-Page Content Plan

### 5.1 Home (`/`)
- **Hero:** Full-bleed dark hero with crest logo, lightning-crack texture background, bold headline ("Beaumont Knights Baseball" + script tagline like "Forge Your Season"), primary CTA ("Register for Tryouts") + secondary CTA ("View Schedule").
- **Welcome blurb:** 2–3 sentences, warm tone, non-profit + community framing.
- **Quick stats/badges:** Divisions offered (9U/10U), season, non-profit status, Instagram follow count/handle.
- **Upcoming events strip:** Next 3 events pulled live from the schedule (tryout/practice/game), each with date, time, location, "Add to calendar" button.
- **Why Beaumont Knights:** 3–4 short value cards (coaching quality, welcoming community, affordability/scholarships, competitive development) — ice-cream-drip card top accent here is a good use of the fun motif.
- **Team photo strip / Instagram embed.**
- **Sponsor logo strip** (if any at launch, else omit until sponsors exist).
- **Final CTA band:** "Ready to join the family?" → signup form.

### 5.2 About (`/about`)
- Mission & story (why the club exists, founding, community roots in Beaumont).
- Non-profit status callout (501(c)(3), EIN if they want it public, where donations go).
- Coaching staff / board of directors with short bios and photos.
- Values section (welcoming, development-focused, family-first).

### 5.3 Teams (`/teams/9u`, `/teams/10u`)
- Division explainer (age cutoff dates, what travel ball at this level looks like).
- Coach(es) for that team, roster (once formed), practice location/times.
- Team-specific schedule filter (links into `/schedule` pre-filtered).

### 5.4 Schedule (`/schedule`) — see §6 for full feature spec.

### 5.5 Tryouts (`/tryouts`)
- Dates/times/location (pulled from schedule).
- What to bring, what to wear, format of the tryout, what evaluators look for.
- FAQ specific to first-timers ("Never played travel ball before?").
- CTA straight to `/signup`.

### 5.6 Signup (`/signup`) — see §7 for full form spec.

### 5.7 Sponsors (`/sponsors`)
- Why sponsor a non-profit youth team (community impact, visibility).
- Sponsorship tiers with pricing and benefits (canopy logo placement, jersey patch, website recognition, social shoutouts).
- Current sponsor logo wall.
- Contact CTA for prospective sponsors.

### 5.8 Donate (`/donate`)
- Clear statement of non-profit status and what donations fund (equipment, field fees, scholarships for families in need, tournament costs).
- Donation form/embed (Stripe/PayPal donation button — no fee collection needed for registration per current scope, but a simple donate button is standard for non-profits).
- Optional: sponsor a player / scholarship fund messaging.

### 5.9 Gallery (`/gallery`)
- Photo grid (season highlights, team events), Instagram feed embed as the easiest way to keep it fresh without a CMS burden.

### 5.10 News/Updates (`/news`)
- Short posts: season kickoff, tournament results, tryout announcements, fundraiser updates.
- Doubles as fresh, crawlable content for SEO — Google and AI crawlers favor sites that update regularly.

### 5.11 FAQ (`/faq`)
- Real parent questions: costs, time commitment, equipment needed, tryout process, travel expectations, refund/cancellation policy.
- Structured with FAQPage schema (see §8) — this page is a major AI-search asset.

### 5.12 Contact (`/contact`)
- Simple contact form (name, email, question/topic, message).
- Board/staff contact list with roles (President, Registrar, Fundraising, etc.).
- Location/mailing address if applicable, Instagram link.

---

## 6. Schedule / Events Calendar — Feature Spec

**Purpose:** The one place parents check for tryouts, practices, and games. Must never be out of date or confusing.

- **Views:** Mobile-first agenda/list view by default (chronological cards: date, time, event type, location, notes) — a full month-grid calendar view available as a toggle for desktop/larger screens, but list view is primary since most traffic is mobile.
- **Event types (color/icon coded, all within the gold/steel palette — not rainbow):** Tryout, Practice, Game, Tournament, Team Event/Social.
- **Each event shows:** title, division (9U/10U/Both), date, start–end time, location (with a tap-to-open Google Maps link/address), short notes (e.g., "bring cleats, arrive 15 min early"), and an "Add to my calendar" action (generates a `.ics` file / Google Calendar link — no login required).
- **Filtering:** Filter by division (9U / 10U / All) and event type. Persist filter choice in the URL so a link like `/schedule?division=9u` can be shared directly with that team's parent group chat.
- **Subscribe:** Offer a subscribable calendar feed (iCal URL) parents can add once to their phone calendar and get all updates automatically — this removes "did you see the schedule changed?" friction entirely and is worth prioritizing early.
- **Admin/updating — decided:** Coaches need to edit the schedule themselves without a developer, so the site ships with a simple, coach-friendly admin form (add/edit/delete an event: type, division, date, time, location, notes) backed by the headless CMS in §10, not a raw Google Calendar embed. A coach should be able to fix a rained-out practice from their phone in under a minute. Every edit auto-updates the `.ics` subscription feed so parents who've subscribed get the change automatically — this is the whole point of paying for a real admin UI instead of the Google Calendar stopgap.
- **Rain-out/change alerts:** A visually distinct "Updated" or "Cancelled" badge on any event edited within the last 48 hours, so returning visitors immediately see what changed.

---

## 7. Signup / Registration Form — Feature Spec

**Current scope: information collection only** — no online payment processing at this stage (fees handled offline). Design the data model so a payment step can be added later without rebuilding the form.

### 7.1 Form sections
1. **Player Information**
   - Full name, date of birth (drives 9U/10U eligibility — auto-suggest division based on DOB, cutoff rules confirmed with league), gender (if relevant to league structure), current school/grade (optional), shirt/uniform size, primary position(s) played (optional), years of experience / prior teams (optional).
2. **Parent/Guardian Information**
   - Primary parent/guardian name, relationship to player, phone, email, home address, city/zip (confirms local eligibility for Beaumont-area residency if the league requires it).
   - Secondary parent/guardian (optional second contact).
3. **Emergency Contact** (if different from parents) — name, relationship, phone.
4. **Medical/Allergy Notes** (optional free-text, clearly marked confidential, shared only with coaching staff).
5. **Interest details**
   - Division interested in (9U/10U — auto-filled from DOB, editable).
   - How did you hear about us? (dropdown: Instagram, word of mouth, school, other — useful marketing data).
   - Volunteer interest checkbox (non-profits run on volunteer parents — coach, team parent, fundraising, snack shack).
6. **Consent**
   - Photo/video release for social media and website (checkbox).
   - Waiver/liability acknowledgment (checkbox, link to full waiver text).
   - Communications opt-in (email/SMS updates about schedule and news).

### 7.2 UX requirements
- Multi-step on mobile (e.g., Player → Parent → Consent) with a progress indicator, rather than one long scroll — reduces abandonment.
- Inline validation, large touch targets, native mobile input types (`tel`, `email`, date picker) so mobile keyboards adapt correctly.
- Autosave/local-draft so a parent who gets interrupted mid-form (very likely, with a 9-year-old around) doesn't lose progress.
- Confirmation screen after submit: warm, on-brand ("Welcome to the Knights family!") — a good spot for the ice-cream-drip/celebratory motif — plus what happens next (email confirmation, next steps, link back to `/schedule` for tryout dates).
- Submission triggers: confirmation email to the parent, and a notification to the registrar/board (email or a simple dashboard, depending on stack).
- Data storage: must be handled securely (this is collecting minors' info + parent PII) — encrypted at rest, access limited to authorized board members, clear privacy policy linked from the form.

---

## 8. SEO Strategy (Google + traditional search)

- **Local SEO is the priority** — most searches will be geographically qualified ("youth baseball Beaumont CA," "9U travel baseball near me," "Beaumont Knights baseball").
- Claim/optimize a **Google Business Profile** for the org (even as a non-profit sports club, this materially helps local pack rankings).
- Every page: unique, descriptive `<title>` and meta description written for humans first (California Craigslist-style keyword stuffing hurts more than it helps now).
- Semantic HTML structure (`<h1>` once per page, logical heading hierarchy, `<nav>`, `<main>`, `<footer>` landmarks) — also directly helps AI crawlers (§9).
- Fast Core Web Vitals: this is a ranking factor and directly affects the mobile-first experience — optimize images (WebP/AVIF), lazy-load below-the-fold images, minimize JS blocking render.
- `/news` and `/faq` pages are the main ongoing SEO engines — fresh, regularly updated content beats a static brochure site over time.
- Structured data (JSON-LD) on every relevant page:
  - `SportsOrganization` / `SportsClub` on the homepage/about (name, logo, sport, address, social links).
  - `Event` schema for every entry on `/schedule` (tryouts, games) — enables rich results and is *also* what AI answer engines pull from directly.
  - `FAQPage` schema on `/faq`.
  - `BreadcrumbList` on interior pages.
- Local citations: consistent NAP (Name, Address, Phone) across the site footer, Google Business Profile, and any league/association directory listings.
- Backlinks: get listed on the youth league/association site they play under, local Beaumont community sites, and youth sports directories.

---

## 9. AI Search / Answer-Engine Optimization (AEO)

AI search (ChatGPT, Google AI Overviews, Perplexity, Claude, etc.) reads pages differently than traditional search — it favors clear, extractable facts over marketing copy. This is a newer discipline; treat it as complementary to §8, not separate.

- **Answer clearly-phrased questions directly in the copy**, especially on `/faq` and `/tryouts` — write in a Q&A format an LLM can lift verbatim ("Q: How much does it cost to join the Beaumont Knights? A: ..."). Avoid burying facts in vague marketing paragraphs.
- **Structured data is the highest-leverage lever** — the `Event`, `FAQPage`, and `Organization` JSON-LD from §8 is exactly what AI crawlers parse most reliably; keep it accurate and complete.
- **`llms.txt`** at the site root: a plain-text summary of the org, divisions, key facts, and links to the most important pages (schedule, signup, FAQ) — an emerging convention some AI crawlers use to quickly understand a site's purpose.
- **Consistent, unambiguous facts everywhere** — the org name, location, age divisions, and season dates should be worded identically across the homepage, About, FAQ, and JSON-LD. AI systems cross-reference for consistency; conflicting phrasing (e.g., "Beaumont, CA" vs. "Beaumont, California" vs. "Beaumont CA 92223" used inconsistently) can undermine confidence.
- **Allow AI crawlers** in `robots.txt` (e.g., `GPTBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`) unless there's a specific reason to block them — being excluded means being invisible in AI answers.
- **Keep a single canonical fact page** (`/faq` or a dedicated "Quick Facts" section) that an AI system could summarize entirely on its own — divisions, location, cost range, how to sign up, contact info, non-profit status.

---

## 10. Recommended Tech Stack

Given: non-profit, likely volunteer-run/limited budget, needs a real calendar + form (not just a brochure), wants strong SEO/AEO, and no immediate payment processing requirement.

**Recommendation: Next.js (React) statically-generated site, deployed on Vercel, with a lightweight headless CMS for schedule/news content.**

- **Framework:** Next.js — best-in-class for the SEO/Core-Web-Vitals requirements in §8 (server-rendered/static HTML, fast, great `<head>`/meta control, native support for JSON-LD structured data), while still being a real custom build that can fully express the dark/gold/knight design system from §2 (a no-code builder would fight the custom styling and structured-data needs).
- **Hosting:** Vercel (or Netlify) — free/cheap tier is generally sufficient for a club site's traffic, automatic HTTPS, fast global CDN (matters for mobile users on cellular data), simple deploys.
- **Content/schedule management — decided:** A lightweight headless CMS (Sanity is a good fit — generous free tier, simple custom admin forms) so coaches/board members can add/edit schedule events and news posts themselves, no developer required, no Google Calendar stopgap. This also keeps every event as real structured HTML + `Event` JSON-LD (§8), which a raw calendar embed can't give us.
- **Forms:** Next.js API route (or a form service like Formspree/Basin) storing submissions to a database (e.g., a simple Postgres via Supabase, or Airtable for a v1 that's easy for non-technical board members to view/export) — with email notifications to the registrar.
- **Analytics:** Privacy-friendly analytics (e.g., Plausible or GA4) to track which pages convert to sign-ups.
- **Domain/email:** See §11.

*(This is a recommendation, not a lock-in — if a developer isn't available long-term, a no-code builder like Squarespace is a reasonable fallback that trades some design/SEO control for ease of self-maintenance. Revisit this section once that's decided.)*

---

## 11. Domain & Hosting

**Decided: `beaumontknights.com`.** Point it at the Vercel/Netlify deployment (§10) via the registrar's DNS. Set up a matching org email (e.g., `info@beaumontknights.com`) rather than a personal Gmail for all public-facing contact — improves both trust and deliverability. Consider also registering `beaumontknights.org` and 301-redirecting it to the `.com` — cheap insurance that also reinforces non-profit credibility for anyone who guesses the `.org`.

---

## 12. Accessibility & Mobile-First Requirements

- Minimum 16px body text; touch targets minimum 44×44px (Apple/WCAG guidance) — critical since most use is mobile and parents may be using the site one-handed.
- Color contrast: verify all gold-on-black and silver-on-black text combinations meet WCAG AA (4.5:1 for body text) — the exact gold values in §2.1 should be contrast-checked once finalized, since bright gold on black can fail at small sizes.
- All interactive elements keyboard-navigable and screen-reader labeled (forms especially — this is legally collecting minors' data, accessibility isn't optional).
- Alt text on all images, especially the logo/crest and any informational graphics (schedule graphics should never be image-only — always paired with real text/HTML).
- Respect `prefers-reduced-motion` for any animated lightning/drip effects.
- Test on real mid-range Android devices and older iPhones, not just the newest hardware — assume variable rural/cellular connection speeds.

---

## 13. Non-Profit-Specific Considerations

- Display 501(c)(3) status and EIN (if the board is comfortable making it public) on `/about` and `/donate` for donor trust/tax-deduction transparency.
- Clear statement of where money goes (equipment, field/league fees, tournament travel, scholarships) — donors and sponsors give more when impact is concrete.
- Volunteer board/coach transparency builds trust with new parents evaluating the org.
- Consider a "Scholarship / Financial Assistance" mention early — removes a barrier for families who might otherwise not inquire, and reinforces the "welcoming" brand goal.

---

## 14. Placeholder Launch Content

Everything in this section is **draft content marked for replacement** — it exists so pages can be built and previewed now instead of blocking on final facts. Every item here should also appear (or already appears) in the Open Questions list (§15) until the board confirms real values. Search the codebase for `TODO(placeholder)` once built, and cross-reference against this list before public launch.

### 14.1 Registration fee (estimate)

No confirmed figure yet. Youth travel baseball at the 9U/10U level for a grassroots/community non-profit club (as opposed to an elite/showcase travel org) typically runs **$300–$450 per season**, generally covering uniform, league/field fees, umpires, insurance, and a portion of tournament entry costs — with additional a-la-carte tournament fees sometimes billed separately. 

**Placeholder copy for `/tryouts` and `/faq`:** *"Registration is approximately $[350] for the season, which covers your uniform, league and field fees, and insurance. We never want cost to keep a kid off the field — ask us about our scholarship program."* Replace the bracketed figure once the board sets it, and confirm whether tournament fees are included or billed separately.

### 14.2 Sample season schedule (placeholder dates)

Illustrative only — replace with the real season calendar, but useful for building/testing the `/schedule` feature (list view, filters, `.ics` export) end to end.

| Date | Time | Type | Division | Location | Notes |
|---|---|---|---|---|---|
| Sat, Aug 23 | 9:00–11:00 AM | Tryout | 9U | Beaumont Sports Park, Field 1 | Bring glove, bat, cleats. Arrive 15 min early to check in. |
| Sat, Aug 23 | 11:30 AM–1:30 PM | Tryout | 10U | Beaumont Sports Park, Field 1 | Bring glove, bat, cleats. Arrive 15 min early to check in. |
| Tue, Aug 26 | 5:30–7:00 PM | Practice | 9U | Beaumont Sports Park, Field 2 | First practice — team assignments announced. |
| Thu, Aug 28 | 5:30–7:00 PM | Practice | 10U | Beaumont Sports Park, Field 2 | First practice — team assignments announced. |
| Tue, Sep 2 | 5:30–7:00 PM | Practice | 9U | Beaumont Sports Park, Field 2 | |
| Thu, Sep 4 | 5:30–7:00 PM | Practice | 10U | Beaumont Sports Park, Field 2 | |
| Sat, Sep 13 | 8:00 AM–1:00 PM | Game | 9U | Away — TBD opponent | First game of the season. |
| Sat, Sep 13 | 8:00 AM–1:00 PM | Game | 10U | Away — TBD opponent | First game of the season. |
| Sat, Sep 20 | All day | Tournament | Both | TBD | Season-opening tournament — details to follow. |

### 14.3 Board & coaching staff (placeholder bios, for `/about`)

Replace names/photos once confirmed; keep the warm, first-name tone.

- **[Board President Name]** — President, Beaumont Knights Baseball. *"A Beaumont dad/mom who's been coaching youth sports for [X] years and started this club to give local kids a welcoming, affordable place to fall in love with the game."*
- **[Head Coach Name]** — 9U Head Coach. *"Played [college/level] ball and has coached 9U–12U for [X] years. Believes development and fun come before winning at this age."*
- **[Head Coach Name]** — 10U Head Coach. *"[X] years coaching travel baseball in the Inland Empire. Focused on fundamentals and building confidence."*
- **[Registrar/Treasurer Name]** — Registrar & Treasurer. *"Handles registration, scheduling logistics, and fundraising — the person to email with signup or payment questions."*

### 14.4 Non-profit info (publish on `/about` and `/donate`)

Board confirmed this should be public. EIN is a placeholder pending the board providing the real number — do not publish a fabricated EIN; leave the field visibly blank/TBD in the CMS until supplied, rather than shipping a fake one.

**Placeholder copy:**
> Beaumont Knights Baseball is a 501(c)(3) non-profit organization (EIN: *[to be added]*). Every dollar raised through registration, sponsorships, and donations goes directly back into the program — field and league fees, equipment, uniforms, tournament costs, and scholarships for families who need financial assistance. We believe every kid in Beaumont who wants to play should have a place on the team.

Include a short "your donation funds..." breakdown (even estimated percentages/categories) once the board has real numbers — donors respond better to concrete allocation than a vague mission statement.

---

## 15. Open Questions / TBD

Track decisions here as they're made — remove from this list once resolved and reflected in the relevant section above. Items below are the ones still genuinely open; resolved items (domain, fee estimate, schedule/board/non-profit placeholders, CMS decision) now live in §11, §14, §6, and §10.

- [ ] Confirmed registration fee amount and exactly what it covers (replace §14.1 estimate)
- [ ] Real tryout/practice/game dates for the actual season (replace §14.2 placeholder calendar)
- [ ] Real board/coach names, roles, photos, and bios (replace §14.3 placeholders)
- [ ] 501(c)(3) EIN — provide the real number to publish (§14.4)
- [ ] League/association affiliation (which league do 9U/10U play in? needed for schedule context and backlink opportunities)
- [ ] Exact primary field/practice location(s) and address(es) — placeholder schedule currently assumes "Beaumont Sports Park"
- [ ] Sponsorship tier pricing and benefits (§5.7)
- [ ] Confirm brand hex codes against original logo source files if available (Adobe Illustrator/Photoshop swatches), rather than the sampled values in §2.1
- [ ] Donation allocation breakdown for `/donate` (real percentages/categories once available)

---

## 16. Next Steps

1. Resolve as many "Open Questions" (§15) as possible — content gaps block real page-building more than design decisions do.
2. Set up the domain + hosting (§11).
3. Scaffold the Next.js project with the design tokens from §2 (colors, type, spacing) as a shared theme/config — every page built after this point pulls from that config rather than hardcoding values.
4. Build `/schedule` and `/signup` first — they're the two functional pillars parents actually need, ahead of "About"-style pages.
5. Layer in SEO/AEO structured data (§8–9) as each page ships, not as a retrofit at the end.
6. Soft-launch to the existing Instagram following for feedback before wider promotion.
