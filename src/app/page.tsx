import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import EventCard from "@/components/EventCard";
import GrungeBackdrop from "@/components/GrungeBackdrop";
import EmblemPattern from "@/components/EmblemPattern";
import { siteConfig } from "@/data/site";
import { getUpcomingEvents } from "@/data/schedule";
import emblemFullSrc from "../../public/logo/emblem-full.png";

const valueCards = [
  {
    title: "Welcoming From Day One",
    body: "New to travel ball? So are a lot of our families. Every kid gets a real shot and a coach who knows their name.",
  },
  {
    title: "Real Coaching, Real Development",
    body: "Fundamentals-first coaching focused on building confidence and skill at the 9U/10U level — not just wins.",
  },
  {
    title: "Non-Profit, Family-First",
    body: "We're a 501(c)(3) run by volunteer parents. Every dollar goes back into the kids, and cost never turns a family away.",
  },
  {
    title: "A Team That Feels Like Family",
    body: "Team socials, dugout traditions, and a community that shows up for each other on and off the field.",
  },
];

export default function HomePage() {
  const upcoming = getUpcomingEvents(3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-knight-gold/40 bg-knight-black">
        <GrungeBackdrop className="absolute inset-0 h-full w-full" />

        {/* Small diagonal tiled emblem pattern — the background texture */}
        <EmblemPattern />

        {/* Full emblem, full hero height, as a faded centerpiece watermark */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <Image
            src={emblemFullSrc}
            alt=""
            priority
            className="h-full w-auto max-w-none opacity-[0.14]"
          />
        </div>

        <Container className="relative flex flex-col items-center gap-6 py-16 text-center sm:py-24">
          <p className="font-accent animate-fade-up text-2xl leading-tight text-knight-gold-bright sm:text-3xl">
            {siteConfig.tagline}
          </p>
          <h1 className="font-display animate-fade-up text-4xl uppercase leading-tight tracking-wide text-knight-silver sm:text-6xl">
            Beaumont Knights <span className="gold-gradient-text">Baseball</span>
          </h1>
          <p className="animate-fade-up max-w-xl text-base text-knight-silver/80 sm:text-lg">
            A welcoming, non-profit 9U &amp; 10U travel baseball club in Beaumont,
            CA. Come play for a team that feels like family.
          </p>
          <div className="animate-fade-up flex flex-wrap justify-center gap-2">
            <span className="plate-badge text-xs">Non-Profit</span>
            <span className="plate-badge text-xs">9U / 10U</span>
            <span className="plate-badge text-xs">Beaumont, CA</span>
          </div>
          <div className="animate-fade-up flex flex-col gap-3 pb-6 sm:flex-row">
            <Button href="/signup">Register for Tryouts</Button>
            <Button href="/schedule" variant="secondary">
              View Schedule
            </Button>
          </div>
        </Container>
      </section>

      {/* Quick facts */}
      <Container className="grid grid-cols-2 gap-4 py-10 text-center sm:grid-cols-4">
        {[
          { label: "Divisions", value: "9U / 10U" },
          { label: "Location", value: "Beaumont, CA" },
          { label: "Status", value: "Non-Profit" },
          { label: "Instagram", value: siteConfig.instagramHandle },
        ].map((stat) => (
          <div key={stat.label} className="rounded border border-knight-charcoal-light bg-knight-charcoal p-4">
            <p className="font-display text-lg text-knight-gold-bright sm:text-xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs uppercase tracking-wide text-knight-silver/60">
              {stat.label}
            </p>
          </div>
        ))}
      </Container>

      {/* Upcoming events */}
      <Container className="py-10">
        <SectionHeading eyebrow="What's Next" title="Upcoming Events" />
        {upcoming.length > 0 ? (
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-knight-silver/70">
            No upcoming events posted yet — check back soon.
          </p>
        )}
        <div className="mt-6">
          <Button href="/schedule" variant="secondary">
            View Full Schedule
          </Button>
        </div>
      </Container>

      {/* Why Beaumont Knights */}
      <Container className="py-10">
        <SectionHeading eyebrow="Welcome to the Family" title="Why Beaumont Knights" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {valueCards.map((card) => (
            <div
              key={card.title}
              className="rounded border border-knight-charcoal-light bg-knight-charcoal p-5"
            >
              <h3 className="font-heading text-lg font-semibold text-knight-gold-bright">
                {card.title}
              </h3>
              <p className="mt-2 text-sm text-knight-silver/80">{card.body}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Instagram / community strip */}
      <Container className="py-10">
        <SectionHeading eyebrow="Follow Along" title="The Knights Family" align="center" />
        <p className="mx-auto mt-4 max-w-xl text-center text-sm text-knight-silver/70">
          Follow us on Instagram for tryout announcements, game-day photos, and
          everything happening with the Knights family.
        </p>
        <div className="mt-6 flex justify-center">
          <Button
            href={siteConfig.instagramUrl}
            variant="secondary"
          >
            {siteConfig.instagramHandle}
          </Button>
        </div>
      </Container>

      {/* Final CTA */}
      <section className="relative overflow-hidden border-t border-knight-charcoal-light py-14">
        <GrungeBackdrop className="absolute inset-0 h-full w-full" />
        <Container className="relative text-center">
          <h2 className="font-display text-3xl uppercase tracking-wide text-knight-silver sm:text-4xl">
            Ready to <span className="gold-gradient-text">Join the Family?</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-knight-silver/80">
            Tryouts fill up fast — sign up today and let&apos;s get your player
            on the field.
          </p>
          <div className="mt-6 flex justify-center">
            <Button href="/signup">Register for Tryouts</Button>
          </div>
          <p className="mt-4 text-xs text-knight-silver/50">
            Questions first?{" "}
            <Link href="/faq" className="text-knight-gold-bright hover:underline">
              Check our FAQ
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}
