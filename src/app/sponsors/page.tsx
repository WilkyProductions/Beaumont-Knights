import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "Sponsor Beaumont Knights Baseball, a non-profit 9U/10U travel team in Beaumont, CA, and support youth baseball in your community.",
};

const tiers = [
  {
    name: "Bronze",
    price: "$250",
    perks: ["Logo on team website sponsor wall", "Shoutout on Instagram"],
  },
  {
    name: "Silver",
    price: "$500",
    perks: [
      "Everything in Bronze",
      "Logo on team canopy",
      "Mentioned in season kickoff post",
    ],
  },
  {
    name: "Gold",
    price: "$1,000+",
    perks: [
      "Everything in Silver",
      "Jersey patch placement",
      "Featured sponsor spotlight on the website",
    ],
  },
];

export default function SponsorsPage() {
  return (
    <Container className="py-12 sm:py-16">
      <SectionHeading eyebrow="Partner With Us" title="Sponsors" />

      <p className="mt-4 max-w-2xl text-knight-silver/80">
        Beaumont Knights Baseball is a non-profit — your sponsorship directly
        funds field fees, equipment, uniforms, and scholarships that keep the
        game accessible for every family in Beaumont. In return, your
        business gets real visibility with local families who notice who
        supports their kids.
      </p>

      <div className="mt-8 text-xs uppercase tracking-wide text-knight-silver/50">
        Pricing below is a starting-point placeholder — confirm final tiers
        with the board.
      </div>

      <div className="mt-3 grid gap-5 sm:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className="flex flex-col rounded border border-knight-charcoal-light bg-knight-charcoal p-5"
          >
            <h3 className="font-heading text-lg font-semibold text-knight-gold-bright">
              {tier.name}
            </h3>
            <p className="font-display mt-1 text-2xl text-knight-silver">
              {tier.price}
            </p>
            <ul className="mt-4 flex-1 space-y-2 text-sm text-knight-silver/80">
              {tier.perks.map((perk) => (
                <li key={perk} className="flex gap-2">
                  <span className="text-knight-gold-bright">•</span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded border border-knight-charcoal-light bg-knight-charcoal p-5">
        <h3 className="font-heading text-sm uppercase tracking-wide text-knight-gold">
          Current Sponsors
        </h3>
        <p className="mt-2 text-sm text-knight-silver/70">
          Sponsor logos will appear here once our first partners are on
          board.
        </p>
      </div>

      <div className="mt-10">
        <Button href={`mailto:${siteConfig.email}?subject=Sponsorship Inquiry`}>
          Become a Sponsor
        </Button>
      </div>
    </Container>
  );
}
