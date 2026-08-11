import { defineField, defineType } from "sanity";

export default defineType({
  name: "photo",
  title: "Gallery Photo",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
    defineField({
      name: "takenAt",
      title: "Date Taken",
      type: "date",
    }),
  ],
  orderings: [
    {
      title: "Date Taken, Newest",
      name: "takenAtDesc",
      by: [{ field: "takenAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "caption", media: "image" },
  },
});
