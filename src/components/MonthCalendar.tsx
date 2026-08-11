"use client";

import { useMemo, useState } from "react";
import type { ScheduleEvent } from "@/data/schedule";
import EventCard from "./EventCard";

const typeDotColor: Record<ScheduleEvent["type"], string> = {
  Tryout: "bg-knight-gold-bright",
  Practice: "bg-knight-steel",
  Game: "bg-knight-gold",
  Tournament: "bg-knight-gold-deep",
  "Team Event": "bg-knight-silver",
};

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function toDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
}

export default function MonthCalendar({ events }: { events: ScheduleEvent[] }) {
  const [cursor, setCursor] = useState(() => {
    const first = events[0];
    return first ? new Date(`${first.date}T00:00:00`) : new Date();
  });
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, ScheduleEvent[]>();
    for (const event of events) {
      const list = map.get(event.date) ?? [];
      list.push(event);
      map.set(event.date, list);
    }
    return map;
  }, [events]);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const startWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);

  const monthLabel = cursor.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const todayKey = toDateKey(new Date());
  const selectedEvents = selectedKey ? eventsByDate.get(selectedKey) ?? [] : [];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCursor(new Date(year, month - 1, 1))}
          aria-label="Previous month"
          className="tag flex h-9 w-9 items-center justify-center border border-knight-charcoal-light text-knight-gold-bright hover:bg-knight-gold/10"
        >
          ‹
        </button>
        <p className="font-heading text-base uppercase tracking-wide text-knight-silver">
          {monthLabel}
        </p>
        <button
          type="button"
          onClick={() => setCursor(new Date(year, month + 1, 1))}
          aria-label="Next month"
          className="tag flex h-9 w-9 items-center justify-center border border-knight-charcoal-light text-knight-gold-bright hover:bg-knight-gold/10"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 pb-2 text-center text-[10px] uppercase tracking-wide text-knight-silver/50 sm:text-xs">
        {weekdayLabels.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <div key={i} className="aspect-square sm:aspect-auto sm:h-24" />;

          const key = toDateKey(date);
          const dayEvents = eventsByDate.get(key) ?? [];
          const isToday = key === todayKey;
          const isSelected = key === selectedKey;

          return (
            <button
              key={i}
              type="button"
              disabled={dayEvents.length === 0}
              onClick={() => setSelectedKey(isSelected ? null : key)}
              className={`aspect-square rounded border p-1 text-left align-top transition-colors sm:aspect-auto sm:h-24 sm:p-1.5 ${
                isSelected
                  ? "border-knight-gold bg-knight-gold/15"
                  : isToday
                    ? "border-knight-gold/60 bg-knight-charcoal"
                    : "border-knight-charcoal-light bg-knight-charcoal"
              } ${dayEvents.length === 0 ? "cursor-default" : "cursor-pointer hover:border-knight-gold/50"}`}
            >
              <span
                className={`text-[10px] sm:text-xs ${
                  isToday ? "font-bold text-knight-gold-bright" : "text-knight-silver/60"
                }`}
              >
                {date.getDate()}
              </span>
              <div className="mt-1 flex flex-wrap gap-0.5 sm:block sm:space-y-0.5">
                {dayEvents.slice(0, 3).map((event) => (
                  <span
                    key={event.id}
                    className={`inline-block h-1.5 w-1.5 rounded-full sm:hidden ${typeDotColor[event.type]}`}
                  />
                ))}
                {dayEvents.slice(0, 2).map((event) => (
                  <p
                    key={event.id}
                    className="hidden truncate text-[10px] text-knight-silver/80 sm:flex sm:items-center sm:gap-1"
                  >
                    <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${typeDotColor[event.type]}`} />
                    <span className="truncate">{event.title}</span>
                  </p>
                ))}
                {dayEvents.length > 2 && (
                  <p className="hidden text-[10px] text-knight-gold-bright sm:block">
                    +{dayEvents.length - 2} more
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {selectedEvents.length > 0 && (
        <div className="mt-6">
          <p className="mb-3 text-xs uppercase tracking-wide text-knight-silver/50">
            {new Date(`${selectedKey}T00:00:00`).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {selectedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
