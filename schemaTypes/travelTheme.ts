import {defineField, defineType} from 'sanity'

/**
 * TRAVEL THEME
 * Experience-based travel grouping that can cut across multiple regions and destinations.
 */
export default defineType({
  name: 'travelTheme',
  title: 'Travel Theme',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'travelFilterValue',
      title: 'Travel Filter Value',
      type: 'string',
      description:
        'Exact value used to filter trips from flipper2 for this theme, for example Wreck Diving or Adventure.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Short editorial summary for cards, hero copy, or discovery sections.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      description: 'Longer editorial description for this travel theme.',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Primary image used for featured travel theme cards.',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alt text'}],
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Controls editorial ordering where themes are shown together.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Use to flag themes for homepage or travel discovery surfaces.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'travelFilterValue',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle: subtitle ? `Filter: ${subtitle}` : undefined,
        media,
      }
    },
  },
})
