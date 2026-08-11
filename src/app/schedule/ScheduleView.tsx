"use client";

import { useState } from "react";
import type { ScheduleEvent } from "@/data/schedule";
import EventCard from "@/components/EventCard";
import MonthCalendar from "@/components/MonthCalendar";

export default function ScheduleView({ events }: { events: ScheduleEvent[] }) {
  const [view, setView] = useState<"list" | "calendar">("list");

  return (
    <div>
      <div className="mt-6 flex gap-2">
        {(["list", "calendar"] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            className={`tag border px-4 py-1.5 text-xs font-heading uppercase tracking-wide ${
              view === v
                ? "border-knight-gold bg-knight-gold/15 text-knight-gold-bright"
                : "border-knight-charcoal-light text-knight-silver/70"
            }`}
          >
            {v === "list" ? "List" : "Calendar"}
          </button>
        ))}
      </div>

      {events.length === 0 ? (
        <p className="mt-8 text-knight-silver/70">No events match those filters yet.</p>
      ) : view === "list" ? (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </ul>
      ) : (
        <div className="mt-8">
          <MonthCalendar events={events} />
        </div>
      )}
    </div>
  );
}
