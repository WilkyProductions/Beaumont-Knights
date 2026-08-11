import { defineField, defineType } from "sanity";

export default defineType({
  name: "player",
  title: "Roster Player",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Player Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "division",
      title: "Division",
      type: "string",
      options: {
        list: ["9U", "10U"],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "jerseyNumber",
      title: "Jersey Number",
      type: "string",
    }),
    defineField({
      name: "position",
      title: "Position(s)",
      type: "string",
      description: 'e.g. "Shortstop, Pitcher"',
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  orderings: [
    {
      title: "Jersey Number",
      name: "jerseyAsc",
      by: [{ field: "jerseyNumber", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "division", media: "photo" },
  },
});
