import { scheduleEvents } from "@/data/schedule";
import { buildIcsCalendar } from "@/lib/ics";

export function GET() {
  const body = buildIcsCalendar(scheduleEvents);
  return new Response(body, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="beaumont-knights-schedule.ics"',
    },
  });
}
