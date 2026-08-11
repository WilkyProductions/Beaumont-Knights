import { getScheduleEvents } from "@/sanity/queries";
import { buildIcsCalendar } from "@/lib/ics";

export async function GET() {
  const events = await getScheduleEvents();
  const body = buildIcsCalendar(events);
  return new Response(body, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="beaumont-knights-schedule.ics"',
    },
  });
}
