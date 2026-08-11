import { defineField, defineType } from "sanity";

// Dropdown of 15-minute time slots (6:00 AM–9:45 PM) instead of free-text
// entry — avoids both typos and timezone-conversion bugs that a native
// datetime picker would introduce (Sanity stores those as UTC, which reads
// wrong once a UTC-hosted server formats them back to local time).
function timeOptions() {
  const options: { title: string; value: string }[] = [];
  for (let h = 6; h <= 21; h++) {
    for (const m of [0, 15, 30, 45]) {
      const value = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
      const period = h < 12 ? "AM" : "PM";
      const hour12 = h % 12 === 0 ? 12 : h % 12;
      options.push({ title: `${hour12}:${String(m).padStart(2, "0")} ${period}`, value });
    }
  }
  return options;
}

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'e.g. "9U Tryout" or "vs. Redlands Rattlers"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eventType",
      title: "Event Type",
      type: "string",
      options: {
        list: ["Tryout", "Practice", "Game", "Tournament", "Team Event"],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "division",
      title: "Division",
      type: "string",
      options: {
        list: ["9U", "10U", "Both"],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "allDay",
      title: "All Day",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "startTime",
      title: "Start Time",
      type: "string",
      options: { list: timeOptions() },
      hidden: ({ document }) => Boolean(document?.allDay),
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.allDay) return true;
          return value ? true : "Required unless this is an all-day event";
        }),
    }),
    defineField({
      name: "endTime",
      title: "End Time",
      type: "string",
      description: "Optional",
      options: { list: timeOptions() },
      hidden: ({ document }) => Boolean(document?.allDay),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: 'e.g. "Beaumont Sports Park, Field 1"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "address",
      title: "Address (optional)",
      type: "string",
    }),
    defineField({
      name: "notes",
      title: "Notes",
      type: "text",
      rows: 3,
      description: 'e.g. "Bring your glove, bat, and cleats."',
    }),
  ],
  preview: {
    select: { title: "title", date: "date", eventType: "eventType" },
    prepare({ title, date, eventType }) {
      return { title, subtitle: `${eventType ?? ""} — ${date ?? "no date"}` };
    },
  },
});
