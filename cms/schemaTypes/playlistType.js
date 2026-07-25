import { defineField, defineType } from "sanity";

export const playlistType = defineType({
  name: "playlist",
  title: "Playlist",
  type: "document",
  fields: [
    defineField({
      name: "city",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "playlistName",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cover",
      type: "image",
      description: "Preferred format: WEBP, < 800KB",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      type: "boolean",
    }),
    defineField({
      name: "slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "profileImage",
      type: "url",
      description: "Google Cloud Storage URL",
    }),
    defineField({
      name: "username",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "instagram",
      type: "string",
    }),
    defineField({
      name: "description",
      type: "text",
    }),
    defineField({
      name: "dateAdded",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      type: "text",
      description:
        "JSON array of spot objects. Generate spot objects using: https://itshere.app/utility",
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      playlistName: "playlistName",
      city: "city",
      username: "username",
      cover: "cover",
    },
    prepare({ playlistName, city, username, cover }) {
      return {
        title: `${city} — ${playlistName}`,
        subtitle: username,
        media: cover,
      };
    },
  },
});
