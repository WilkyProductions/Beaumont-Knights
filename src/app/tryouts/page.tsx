import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import EventCard from "@/components/EventCard";
import { scheduleEvents } from "@/data/schedule";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Tryouts",
  description:
    "Tryout dates, what to bring, and what to expect at a Beaumont Knights 9U/10U travel baseball tryout.",
};

const whatToBring = [
  "Glove, bat, and cleats",
  "Athletic clothes you can move in",
  "A water bottle — Beaumont afternoons run hot",
  "A positive attitude — that's what we're really looking for",
];

export default function TryoutsPage() {
  const tryoutEvents = scheduleEvents.filter((e) => e.type === "Tryout");

  return (
    <Container className="py-12 sm:py-16">
      <SectionHeading eyebrow="First Step" title="Tryouts" />

      <p className="mt-4 max-w-2xl text-knight-silver/80">
        Tryouts are your player&apos;s first look at the Knights family —
        relaxed, welcoming, and focused on seeing what each kid can do. Never
        played travel ball before? No problem, come as you are.
      </p>

      {tryoutEvents.length > 0 && (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {tryoutEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </ul>
      )}

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded border border-knight-charcoal-light bg-knight-charcoal p-5">
          <h3 className="font-heading text-sm uppercase tracking-wide text-knight-gold">
            What to Bring
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-knight-silver/80">
            {whatToBring.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-knight-gold-bright">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded border border-knight-charcoal-light bg-knight-charcoal p-5">
          <h3 className="font-heading text-sm uppercase tracking-wide text-knight-gold">
            What Coaches Look For
          </h3>
          <p className="mt-3 text-sm text-knight-silver/80">
            Coaches evaluate throwing, fielding, hitting, and running — but
            just as much, we&apos;re looking for effort, coachability, and
            attitude. A kid who hustles and listens will always have a place
            with the Knights.
          </p>
        </div>
      </div>

      <div className="mt-10 rounded border border-knight-gold/30 bg-knight-charcoal p-5 sm:p-6">
        <h3 className="font-heading text-sm uppercase tracking-wide text-knight-gold">
          Cost
        </h3>
        <p className="mt-2 max-w-2xl text-sm text-knight-silver/80">
          {siteConfig.registrationFeeNote}
        </p>
      </div>

      <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <Button href="/signup">Register for Tryouts</Button>
        <p className="text-sm text-knight-silver/60">
          Have questions first? Check our{" "}
          <a href="/faq" className="text-knight-gold-bright hover:underline">
            FAQ
          </a>
          .
        </p>
      </div>
    </Container>
  );
}
