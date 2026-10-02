import { defineField, defineType } from "sanity";

const spotField = (index) =>
  defineField({
    name: `spot${index}`,
    title: `Spot ${index}`,
    type: "object",
    fields: [
      defineField({ name: "image", type: "image" }),
      defineField({ name: "name", type: "string" }),
      defineField({ name: "type", type: "string" }),
      defineField({ name: "rating", type: "string" }),
      defineField({ name: "reviewCount", title: "Review count", type: "string" }),
      defineField({
        name: "showOnMobile",
        title: "Show on mobile",
        type: "boolean",
        initialValue: false,
      }),
    ],
  });

export const homePageType = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    defineField({
      name: "announcementBanner",
      title: "Announcement banner",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "visible",
          title: "Visible",
          description: "Show the announcement banner on the site",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "desktopMessage",
          title: "Desktop message",
          type: "string",
        }),
        defineField({
          name: "mobileMessage",
          title: "Mobile message",
          description: "Optional — uses the desktop message if not filled",
          type: "string",
        }),
        defineField({
          name: "ctaText",
          title: "CTA text",
          type: "string",
        }),
        defineField({
          name: "href",
          title: "CTA link",
          description:
            "A relative path (e.g. /signin) renders a right arrow. A full URL (e.g. https://...) renders a northeast arrow.",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "discoverSection",
      title: "Discover",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "heading", type: "string" }),
        defineField({ name: "subhead", type: "text" }),
        defineField({ name: "cta", title: "CTA", type: "string" }),
        spotField(1),
        spotField(2),
        spotField(3),
        spotField(4),
        spotField(5),
      ],
    }),
    defineField({
      name: "importSection",
      title: "Import",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "heading", type: "string" }),
        defineField({ name: "subhead", type: "text" }),
        defineField({ name: "cta", title: "CTA", type: "string" }),
        defineField({ name: "sourceImage1", title: "Source image 1", type: "image" }),
        defineField({ name: "sourceImage2", title: "Source image 2", type: "image" }),
        defineField({ name: "sourceImage3", title: "Source image 3", type: "image" }),
        defineField({ name: "finalImage", title: "Final image", type: "image" }),
      ],
    }),
    defineField({
      name: "shareSection",
      title: "Share",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "heading", type: "string" }),
        defineField({ name: "subhead", type: "text" }),
        defineField({ name: "cta", title: "CTA", type: "string" }),
        defineField({ name: "photoJuliette", title: "Photo — Juliette", type: "image" }),
        defineField({ name: "photoEm", title: "Photo — Em", type: "image" }),
        defineField({ name: "photoEkin", title: "Photo — Ekin", type: "image" }),
        defineField({ name: "photoMimi", title: "Photo — Mimi", type: "image" }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home page" };
    },
  },
});
