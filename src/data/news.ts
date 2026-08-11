// Placeholder news/announcement posts. Replace with real season updates —
// this page is one of the site's main SEO/AEO engines (SITE-PLAN.md §5.10),
// so keep posting real, dated content once the season starts.

export interface NewsPost {
  slug: string;
  title: string;
  date: string; // ISO date
  excerpt: string;
  body: string[];
}

export const newsPosts: NewsPost[] = [
  {
    slug: "welcome-to-the-knights-family",
    title: "Welcome to the Beaumont Knights Family",
    date: "2026-07-01",
    excerpt:
      "Beaumont Knights Baseball is live — here's what to know about our first 9U/10U season.",
    body: [
      "We're excited to officially launch Beaumont Knights Baseball, a non-profit youth travel baseball club for 9U and 10U players right here in Beaumont, California.",
      "Our mission is simple: give every kid who wants to play a welcoming, affordable place to develop as a player and be part of a real team. Tryout dates, the season schedule, and registration are all live now.",
      "Follow us on Instagram and check the schedule page for the latest updates as the season comes together.",
    ],
  },
  {
    slug: "tryout-dates-announced",
    title: "9U & 10U Tryout Dates Announced",
    date: "2026-07-15",
    excerpt:
      "Mark your calendars — 9U and 10U tryouts are set for late August at Beaumont Sports Park.",
    body: [
      "Tryouts for both our 9U and 10U travel teams are now scheduled. Head to the schedule page for exact dates, times, and what to bring.",
      "Never played travel baseball before? No problem — come as you are. We're looking for effort and coachability as much as raw skill.",
    ],
  },
];
