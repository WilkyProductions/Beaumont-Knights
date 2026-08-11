import type { ScheduleEvent } from "@/data/schedule";
import { siteConfig } from "@/data/site";

function toIcsDate(date: string, time: string): string {
  // date: "2026-08-23", time: "09:00" -> "20260823T090000"
  const [h, m] = time.split(":");
  return `${date.replace(/-/g, "")}T${h.padStart(2, "0")}${m.padStart(
    2,
    "0"
  )}00`;
}

function escapeIcsText(text: string): string {
  return text.replace(/[\\,;]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");
}

function eventToIcsLines(event: ScheduleEvent): string[] {
  const start = toIcsDate(event.date, event.startTime);
  const end = event.endTime
    ? toIcsDate(event.date, event.endTime)
    : toIcsDate(event.date, event.startTime);
  const summary = `${event.type}: ${event.title}`;
  const description = [event.notes, `Division: ${event.division}`]
    .filter(Boolean)
    .join(" — ");

  return [
    "BEGIN:VEVENT",
    `UID:${event.id}@beaumontknights.com`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${escapeIcsText(summary)}`,
    `LOCATION:${escapeIcsText(event.location)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    "END:VEVENT",
  ];
}

export function buildIcsCalendar(events: ScheduleEvent[]): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Beaumont Knights Baseball//Schedule//EN",
    "CALSCALE:GREGORIAN",
    `X-WR-CALNAME:${siteConfig.shortName} Schedule`,
    ...events.flatMap(eventToIcsLines),
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

export function buildSingleEventIcs(event: ScheduleEvent): string {
  return buildIcsCalendar([event]);
}

export function googleCalendarUrl(event: ScheduleEvent): string {
  const start = toIcsDate(event.date, event.startTime);
  const end = event.endTime
    ? toIcsDate(event.date, event.endTime)
    : toIcsDate(event.date, event.startTime);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${event.type}: ${event.title}`,
    dates: `${start}/${end}`,
    location: event.location,
    details: event.notes ?? "",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
