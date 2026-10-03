import { defineArrayMember, defineField, defineType } from "sanity";

export const footerType = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "links",
      title: "Links",
      description:
        "A relative path (e.g. /terms) opens in the same tab. A full URL (e.g. https://... or mailto:...) opens in a new tab.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "link",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "URL", type: "string" }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Footer" };
    },
  },
});
