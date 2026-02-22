import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary shown in post previews (optional)",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt text",
              type: "string",
              description: "Describe the image for accessibility",
            },
          ],
        },
        {
          name: "videoEmbed",
          title: "Video",
          type: "object",
          fields: [
            {
              name: "url",
              title: "YouTube or Vimeo URL",
              type: "url",
              description: 'Paste the share URL, e.g. https://www.youtube.com/watch?v=...',
            },
          ],
          preview: {
            select: { url: "url" },
            prepare(value: Record<string, unknown>) {
              return { title: "Video", subtitle: String(value.url ?? "") };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "publishedAt",
      media: "mainImage",
    },
    prepare(value: Record<string, unknown>) {
      const date = value.date as string | undefined;
      return {
        title: value.title as string,
        subtitle: date
          ? new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "Draft",
      };
    },
  },
  orderings: [
    {
      title: "Newest First",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" as const }],
    },
  ],
});
