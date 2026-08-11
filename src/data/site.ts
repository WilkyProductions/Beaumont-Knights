// Single source of truth for org facts. Referenced by page copy AND JSON-LD
// structured data so every surface (visible text + AI/search metadata) says
// the exact same thing — see SITE-PLAN.md §9 (AEO: consistent facts).
//
// Bracketed values are placeholders — see SITE-PLAN.md §15 Open Questions.

export const siteConfig = {
  name: "Beaumont Knights Baseball",
  shortName: "Beaumont Knights",
  tagline: "Forge Your Season",
  legalType: "501(c)(3) non-profit organization",
  description:
    "Beaumont Knights Baseball is a welcoming, non-profit youth travel baseball club for 9U and 10U players in Beaumont, California. Register for tryouts, view the practice and game schedule, and join the Knights family.",
  url: "https://beaumontknights.com",
  divisions: ["9U", "10U"] as const,
  city: "Beaumont",
  state: "CA",
  stateFull: "California",
  region: "Inland Empire",
  addressPlaceholder: "[Field / practice address — TBD]",
  email: "info@beaumontknights.com",
  phonePlaceholder: "[Phone number — TBD]",
  instagramHandle: "@beaumontknights_92223",
  instagramUrl: "https://instagram.com/beaumontknights_92223",
  einPlaceholder: "[EIN — to be added once provided by the board]",
  registrationFeeEstimateLow: 300,
  registrationFeeEstimateHigh: 450,
  registrationFeeNote:
    "Registration is approximately $300–$450 for the season, which covers your uniform, league and field fees, umpires, and insurance. We never want cost to keep a kid off the field — ask us about our scholarship program.",
} as const;

export const primaryNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Teams", href: "/teams/9u" },
  { label: "Schedule", href: "/schedule" },
  { label: "Tryouts", href: "/tryouts" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Donate", href: "/donate" },
  { label: "Gallery", href: "/gallery" },
  { label: "News", href: "/news" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;
