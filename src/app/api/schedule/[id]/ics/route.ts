import { notFound } from "next/navigation";
import { scheduleEvents } from "@/data/schedule";
import { buildSingleEventIcs } from "@/lib/ics";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const event = scheduleEvents.find((e) => e.id === id);
  if (!event) notFound();

  const body = buildSingleEventIcs(event);
  return new Response(body, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${event.id}.ics"`,
    },
  });
}
