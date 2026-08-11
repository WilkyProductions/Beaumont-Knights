import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/data/site";
import { boardMembers } from "@/data/board";
import canopyPhoto from "../../../public/logo/canopy.jpg";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Beaumont Knights Baseball's mission, non-profit status, and the volunteer coaches and board who run the 9U/10U travel program.",
};

export default function AboutPage() {
  return (
    <Container className="py-12 sm:py-16">
      <SectionHeading eyebrow="Our Story" title="About Beaumont Knights" />

      <div className="mt-6 max-w-2xl space-y-4 text-knight-silver/85">
        <p>
          Beaumont Knights Baseball was founded to give kids in Beaumont,
          California a welcoming, affordable place to play travel baseball.
          We&apos;re parents, coaches, and volunteers who believe every 9U and
          10U player deserves real coaching, a real team, and a place where
          they&apos;re known by name.
        </p>
        <p>
          We&apos;re competitive because we care about our players getting
          better — but we&apos;re a family first. If your kid has never
          picked up a glove, or has played travel ball since they could
          walk, there&apos;s a place for them here.
        </p>
      </div>

      <figure className="mt-10 max-w-2xl rounded border border-knight-charcoal-light bg-knight-charcoal p-4 sm:p-5">
        <Image
          src={canopyPhoto}
          alt="Beaumont Knights team canopy at the field"
          className="w-full rounded"
          placeholder="blur"
        />
        <figcaption className="mt-3 text-xs text-knight-silver/50">
          Look for the Knights canopy at the field on game day.
        </figcaption>
      </figure>

      <div className="mt-10 rounded border border-knight-gold/30 bg-knight-charcoal p-5 sm:p-6">
        <h3 className="font-heading text-lg font-semibold text-knight-gold-bright">
          Non-Profit Status
        </h3>
        <p className="mt-2 max-w-2xl text-sm text-knight-silver/80">
          Beaumont Knights Baseball is a {siteConfig.legalType} (EIN:{" "}
          {siteConfig.einPlaceholder}). Every dollar raised through
          registration, sponsorships, and donations goes directly back into
          the program — field and league fees, equipment, uniforms,
          tournament costs, and scholarships for families who need financial
          assistance. We believe every kid in Beaumont who wants to play
          should have a place on the team.
        </p>
      </div>

      <div className="mt-12">
        <SectionHeading eyebrow="Meet the Team" title="Board & Coaching Staff" />
        <p className="mt-3 max-w-2xl text-sm text-knight-silver/60">
          Names, roles, and bios below are placeholders — to be replaced with
          real board/coach info before launch.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {boardMembers.map((member) => (
            <div
              key={`${member.name}-${member.role}`}
              className="rounded border border-knight-charcoal-light bg-knight-charcoal p-5"
            >
              <div className="h-16 w-16 rounded-full border border-knight-gold/40 bg-knight-black" />
              <h3 className="mt-3 font-heading text-base font-semibold text-knight-silver">
                {member.name}
              </h3>
              <p className="text-xs uppercase tracking-wide text-knight-gold-bright">
                {member.role}
              </p>
              <p className="mt-2 text-sm text-knight-silver/75">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
