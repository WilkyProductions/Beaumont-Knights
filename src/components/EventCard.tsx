import type { ScheduleEvent } from "@/data/schedule";
import { googleCalendarUrl } from "@/lib/ics";

const typeStyles: Record<ScheduleEvent["type"], string> = {
  Tryout: "bg-knight-gold/15 text-knight-gold-bright border-knight-gold/40",
  Practice: "bg-knight-steel/15 text-knight-silver border-knight-steel/40",
  Game: "bg-knight-gold/25 text-knight-gold-bright border-knight-gold/50",
  Tournament: "bg-knight-gold-deep/25 text-knight-gold-bright border-knight-gold-deep/50",
  "Team Event": "bg-knight-silver/10 text-knight-silver border-knight-silver/30",
};

function formatDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
}

export default function EventCard({ event }: { event: ScheduleEvent }) {
  return (
    <li className="rounded border border-knight-charcoal-light bg-knight-charcoal p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`tag border px-2.5 py-0.5 text-xs font-heading uppercase tracking-wide ${typeStyles[event.type]}`}
        >
          {event.type}
        </span>
        <span className="tag border border-knight-charcoal-light px-2.5 py-0.5 text-xs font-heading uppercase tracking-wide text-knight-silver/70">
          {event.division}
        </span>
        {event.recentlyUpdated && (
          <span className="tag bg-knight-gold-bright px-2.5 py-0.5 text-xs font-heading uppercase tracking-wide text-knight-black">
            Updated
          </span>
        )}
      </div>

      <h3 className="mt-2 font-heading text-lg font-semibold text-knight-silver">
        {event.title}
      </h3>

      <dl className="mt-2 space-y-1 text-sm text-knight-silver/80">
        <div className="flex gap-2">
          <dt className="w-16 shrink-0 text-knight-silver/50">Date</dt>
          <dd>
            {formatDate(event.date)}
            {!event.allDay && (
              <>
                {" · "}
                {formatTime(event.startTime)}
                {event.endTime ? `–${formatTime(event.endTime)}` : ""}
              </>
            )}
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-16 shrink-0 text-knight-silver/50">Where</dt>
          <dd>{event.location}</dd>
        </div>
        {event.notes && (
          <div className="flex gap-2">
            <dt className="w-16 shrink-0 text-knight-silver/50">Notes</dt>
            <dd>{event.notes}</dd>
          </div>
        )}
      </dl>

      <div className="mt-3 flex flex-wrap gap-3 text-xs font-heading uppercase tracking-wide">
        <a
          href={googleCalendarUrl(event)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-knight-gold-bright hover:underline"
        >
          Add to Google Calendar
        </a>
        <a
          href={`/api/schedule/${event.id}/ics`}
          className="text-knight-gold-bright hover:underline"
        >
          Download .ics
        </a>
      </div>
    </li>
  );
}
