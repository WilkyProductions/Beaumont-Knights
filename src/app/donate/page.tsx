import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support Beaumont Knights Baseball, a 501(c)(3) non-profit youth travel baseball club — donations fund equipment, field fees, and scholarships.",
};

const fundedBy = [
  "Field and league fees",
  "Uniforms and team equipment",
  "Umpires and insurance",
  "Tournament travel costs",
  "Scholarships for families who need financial assistance",
];

export default function DonatePage() {
  return (
    <Container className="max-w-2xl py-12 sm:py-16">
      <SectionHeading eyebrow="Support the Team" title="Donate" />

      <p className="mt-4 text-knight-silver/80">
        Beaumont Knights Baseball is a {siteConfig.legalType} (EIN:{" "}
        {siteConfig.einPlaceholder}). Every dollar donated goes directly back
        into the program — we believe cost should never be the reason a kid
        in Beaumont doesn&apos;t get to play.
      </p>

      <div className="mt-8 rounded border border-knight-charcoal-light bg-knight-charcoal p-5 sm:p-6">
        <h3 className="font-heading text-sm uppercase tracking-wide text-knight-gold">
          Your Donation Funds
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-knight-silver/80">
          {fundedBy.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-knight-gold-bright">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 rounded border border-knight-gold/30 bg-knight-charcoal p-5 sm:p-6">
        <h3 className="font-heading text-sm uppercase tracking-wide text-knight-gold">
          Sponsor a Player
        </h3>
        <p className="mt-2 text-sm text-knight-silver/80">
          Consider sponsoring a scholarship spot for a family that needs
          financial assistance — reach out and we&apos;ll get you set up.
        </p>
      </div>

      {/* TODO: replace with a real donation processor (e.g. Stripe or
          PayPal donate button) once the board sets one up. */}
      <div className="mt-10">
        <Button href={`mailto:${siteConfig.email}?subject=Donation Inquiry`}>
          Contact Us to Donate
        </Button>
      </div>
    </Container>
  );
}
