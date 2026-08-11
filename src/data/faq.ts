// FAQ content — feeds both the /faq page and FAQPage JSON-LD structured
// data (SITE-PLAN.md §8-9). Written in direct Q&A form on purpose so AI
// answer engines can lift it verbatim.

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "What age divisions does Beaumont Knights Baseball offer?",
    answer:
      "Beaumont Knights Baseball currently fields 9U and 10U travel teams. 9U is generally for players who turn 9 before the league's age cutoff, and 10U for players who turn 10 before that cutoff — check with us if you're unsure which division your player falls into.",
  },
  {
    question: "How much does it cost to join the Beaumont Knights?",
    answer:
      "Registration is approximately $300–$450 for the season, which covers your uniform, league and field fees, umpires, and insurance. We never want cost to keep a kid off the field — ask us about our scholarship program.",
  },
  {
    question: "Where is Beaumont Knights Baseball located?",
    answer:
      "We're based in Beaumont, California, in the Inland Empire. Practices and home games are at Beaumont Sports Park (exact field assignments are posted on our schedule page).",
  },
  {
    question: "What's the time commitment for travel baseball at this age?",
    answer:
      "At the 9U/10U level, expect two practices a week plus weekend games, with occasional weekend tournaments. The full season calendar is posted on our schedule page as soon as it's finalized.",
  },
  {
    question: "My child has never played travel baseball before — can they still try out?",
    answer:
      "Absolutely. We're a welcoming program built for players at a range of experience levels, not just kids who've already played travel ball. Come to tryouts, do your best, and our coaches will take it from there.",
  },
  {
    question: "What should my player bring to tryouts?",
    answer:
      "A glove, bat, cleats, and a water bottle. Wear athletic clothes you can move in. Plan to arrive 15 minutes early to check in.",
  },
  {
    question: "Is Beaumont Knights Baseball a non-profit?",
    answer:
      "Yes. Beaumont Knights Baseball is a 501(c)(3) non-profit organization. Registration fees, sponsorships, and donations go directly back into the program — field and league fees, equipment, uniforms, tournament costs, and scholarships for families who need financial assistance.",
  },
  {
    question: "How can parents get involved or volunteer?",
    answer:
      "We're a volunteer-run club and always need help — coaching, team parent duties, fundraising, and gameday support. There's a volunteer-interest checkbox on our signup form, or you can reach out through our contact page.",
  },
  {
    question: "How do I stay updated on schedule changes, like rainouts?",
    answer:
      "Subscribe to our schedule calendar feed from the schedule page — it updates your phone's calendar automatically whenever a coach changes a practice or game time. We also post updates to our Instagram, @beaumontknights_92223.",
  },
];
