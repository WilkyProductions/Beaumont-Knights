import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { faqItems } from "@/data/faq";
import { faqJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Beaumont Knights Baseball — cost, tryouts, time commitment, and how to join.",
};

export default function FaqPage() {
  return (
    <Container className="max-w-2xl py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqItems)) }}
      />

      <SectionHeading eyebrow="Got Questions?" title="Frequently Asked Questions" />

      <dl className="mt-8 space-y-6">
        {faqItems.map((item) => (
          <div key={item.question} className="border-b border-knight-charcoal-light pb-6">
            <dt className="font-heading text-base font-semibold text-knight-gold-bright">
              {item.question}
            </dt>
            <dd className="mt-2 text-sm text-knight-silver/85">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </Container>
  );
}
