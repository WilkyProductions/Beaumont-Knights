import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/data/site";
import { boardMembers } from "@/data/board";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Beaumont Knights Baseball — questions about tryouts, sponsorship, or volunteering.",
};

export default function ContactPage() {
  return (
    <Container className="py-12 sm:py-16">
      <SectionHeading eyebrow="We'd Love to Hear From You" title="Contact Us" />

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <ContactForm />

        <div>
          <div className="rounded border border-knight-charcoal-light bg-knight-charcoal p-5">
            <h3 className="font-heading text-sm uppercase tracking-wide text-knight-gold">
              Direct Contact
            </h3>
            <address className="mt-3 space-y-1 text-sm not-italic text-knight-silver/80">
              <p>{siteConfig.addressPlaceholder}</p>
              <p>{siteConfig.phonePlaceholder}</p>
              <p>
                <a href={`mailto:${siteConfig.email}`} className="text-knight-gold-bright hover:underline">
                  {siteConfig.email}
                </a>
              </p>
              <p>
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-knight-gold-bright hover:underline"
                >
                  {siteConfig.instagramHandle}
                </a>
              </p>
            </address>
          </div>

          <div className="mt-6 rounded border border-knight-charcoal-light bg-knight-charcoal p-5">
            <h3 className="font-heading text-sm uppercase tracking-wide text-knight-gold">
              Board & Staff
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-knight-silver/80">
              {boardMembers.map((member) => (
                <li key={`${member.name}-${member.role}`}>
                  <span className="text-knight-silver">{member.name}</span>{" "}
                  <span className="text-knight-silver/50">— {member.role}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
}
