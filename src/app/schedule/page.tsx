import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { sortedEvents, type Division, type EventType } from "@/data/schedule";
import { eventJsonLd } from "@/lib/jsonld";
import ScheduleView from "./ScheduleView";

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "Tryouts, practices, games, and tournaments for the Beaumont Knights 9U and 10U travel baseball teams.",
};

const divisionFilters: (Division | "All")[] = ["All", "9U", "10U"];
const typeFilters: (EventType | "All")[] = [
  "All",
  "Tryout",
  "Practice",
  "Game",
  "Tournament",
  "Team Event",
];

function buildHref(division: string, type: string) {
  const params = new URLSearchParams();
  if (division !== "All") params.set("division", division);
  if (type !== "All") params.set("type", type);
  const qs = params.toString();
  return qs ? `/schedule?${qs}` : "/schedule";
}

export default async function SchedulePage({
  searchParams,
}: {
  searchParams: Promise<{ division?: string; type?: string }>;
}) {
  const { division: divisionParam, type: typeParam } = await searchParams;
  const division = (divisionParam as Division | undefined) ?? "All";
  const type = (typeParam as EventType | undefined) ?? "All";

  const events = sortedEvents().filter((event) => {
    const divisionMatch =
      division === "All" || event.division === division || event.division === "Both";
    const typeMatch = type === "All" || event.type === type;
    return divisionMatch && typeMatch;
  });

  return (
    <Container className="py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(events.map((e) => eventJsonLd(e))),
        }}
      />

      <SectionHeading eyebrow="Never Miss a Game" title="Schedule" />

      <p className="mt-4 max-w-2xl text-sm text-knight-silver/70">
        Placeholder season calendar — dates below will be replaced once the
        board confirms the real season schedule. Subscribe below to get every
        update automatically on your phone.
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href="/calendar.ics"
          className="inline-flex items-center gap-2 rounded-md border border-knight-gold px-4 py-2 text-xs font-heading uppercase tracking-wide text-knight-gold-bright hover:bg-knight-gold/10"
        >
          Subscribe to Full Calendar (.ics)
        </a>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-2">
        <span className="text-xs uppercase tracking-wide text-knight-silver/50">
          Division:
        </span>
        {divisionFilters.map((d) => (
          <Link
            key={d}
            href={buildHref(d, type)}
            className={`tag border px-3 py-1 text-xs font-heading uppercase tracking-wide ${
              d === division
                ? "border-knight-gold bg-knight-gold/15 text-knight-gold-bright"
                : "border-knight-charcoal-light text-knight-silver/70"
            }`}
          >
            {d}
          </Link>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs uppercase tracking-wide text-knight-silver/50">
          Type:
        </span>
        {typeFilters.map((t) => (
          <Link
            key={t}
            href={buildHref(division, t)}
            className={`tag border px-3 py-1 text-xs font-heading uppercase tracking-wide ${
              t === type
                ? "border-knight-gold bg-knight-gold/15 text-knight-gold-bright"
                : "border-knight-charcoal-light text-knight-silver/70"
            }`}
          >
            {t}
          </Link>
        ))}
      </div>

      <ScheduleView events={events} />
    </Container>
  );
}
