import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos and highlights from Beaumont Knights Baseball — 9U and 10U travel team games, practices, and team events.",
};

export default function GalleryPage() {
  return (
    <Container className="py-12 sm:py-16">
      <SectionHeading eyebrow="Team Moments" title="Gallery" />

      <p className="mt-4 max-w-2xl text-knight-silver/80">
        Season photos and highlights will live here. In the meantime, follow{" "}
        <a
          href={siteConfig.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-knight-gold-bright hover:underline"
        >
          {siteConfig.instagramHandle}
        </a>{" "}
        for the latest game-day photos and team moments.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="flex aspect-square items-center justify-center rounded border border-dashed border-knight-charcoal-light bg-knight-charcoal text-xs text-knight-silver/40"
          >
            Photo coming soon
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Button href={siteConfig.instagramUrl} variant="secondary">
          View on Instagram
        </Button>
      </div>
    </Container>
  );
}
