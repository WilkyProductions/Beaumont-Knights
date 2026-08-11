import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { getScheduleEvents, getRosterPlayers } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

const divisions = {
  "9u": {
    label: "9U",
    blurb:
      "Our 9U team is where a lot of players get their first taste of travel baseball — fundamentals, confidence, and fun come first.",
  },
  "10u": {
    label: "10U",
    blurb:
      "Our 10U team builds on the fundamentals with a step up in competition, while keeping the same welcoming, development-first coaching.",
  },
} as const;

type DivisionKey = keyof typeof divisions;

export function generateStaticParams() {
  return Object.keys(divisions).map((division) => ({ division }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ division: string }>;
}): Promise<Metadata> {
  const { division: divisionParam } = await params;
  const key = divisionParam as DivisionKey;
  const division = divisions[key];
  if (!division) return {};
  return {
    title: `${division.label} Team`,
    description: `Info on the Beaumont Knights ${division.label} travel baseball team — coaches, schedule, and how to join.`,
  };
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ division: string }>;
}) {
  const { division: divisionParam } = await params;
  const key = divisionParam as DivisionKey;
  const division = divisions[key];
  if (!division) notFound();

  const [events, roster] = await Promise.all([
    getScheduleEvents(),
    getRosterPlayers(division.label),
  ]);

  const teamEvents = events.filter(
    (e) => e.division === division.label || e.division === "Both"
  );

  return (
    <Container className="py-12 sm:py-16">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(divisions) as DivisionKey[]).map((k) => (
          <Link
            key={k}
            href={`/teams/${k}`}
            className={`tag border px-4 py-1.5 text-xs font-heading uppercase tracking-wide ${
              k === key
                ? "border-knight-gold bg-knight-gold/15 text-knight-gold-bright"
                : "border-knight-charcoal-light text-knight-silver/70"
            }`}
          >
            {divisions[k].label}
          </Link>
        ))}
      </div>

      <div className="mt-4">
        <SectionHeading eyebrow="Meet the Squad" title={`${division.label} Knights`} />
      </div>

      <p className="mt-4 max-w-2xl text-knight-silver/80">{division.blurb}</p>

      <div className="mt-6 rounded border border-knight-charcoal-light bg-knight-charcoal p-5">
        <h3 className="font-heading text-sm uppercase tracking-wide text-knight-gold">
          Coaches
        </h3>
        <p className="mt-2 text-sm text-knight-silver/70">
          Coach names and bios to be added — see the{" "}
          <Link href="/about" className="text-knight-gold-bright hover:underline">
            About page
          </Link>{" "}
          for current staff.
        </p>
      </div>

      <div className="mt-6 rounded border border-knight-charcoal-light bg-knight-charcoal p-5">
        <h3 className="font-heading text-sm uppercase tracking-wide text-knight-gold">
          Roster
        </h3>
        {roster.length > 0 ? (
          <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {roster.map((player) => (
              <li key={player.id} className="text-center">
                <div className="mx-auto h-16 w-16 overflow-hidden rounded-full border border-knight-gold/40 bg-knight-black">
                  {player.photo && (
                    <Image
                      src={urlFor(player.photo).width(128).height(128).fit("crop").url()}
                      alt={player.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <p className="mt-2 text-sm font-semibold text-knight-silver">
                  {player.jerseyNumber && (
                    <span className="text-knight-gold-bright">#{player.jerseyNumber} </span>
                  )}
                  {player.name}
                </p>
                {player.position && (
                  <p className="text-xs text-knight-silver/60">{player.position}</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-knight-silver/70">
            Roster will be posted here once tryouts are complete and teams are
            finalized.
          </p>
        )}
      </div>

      <div className="mt-8">
        <h3 className="font-heading text-sm uppercase tracking-wide text-knight-gold">
          {division.label} Events
        </h3>
        <p className="mt-2 text-sm text-knight-silver/70">
          {teamEvents.length} upcoming event{teamEvents.length === 1 ? "" : "s"} for this team.
        </p>
        <div className="mt-4">
          <Button href={`/schedule?division=${division.label}`} variant="secondary">
            View {division.label} Schedule
          </Button>
        </div>
      </div>
    </Container>
  );
}
