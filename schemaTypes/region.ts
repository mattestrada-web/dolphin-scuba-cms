import {defineField, defineType} from 'sanity'

/**
 * REGION
 * Editorial travel region with a stable filter value for trip aggregation.
 */
export default defineType({
  name: 'region',
  title: 'Region',
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
        'Exact value used to filter trips from flipper2, for example Caribbean or Asia-Pacific.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Short editorial summary for cards, hero copy, or landing sections.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      description: 'Longer regional editorial content.',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Primary image used for homepage avatars and travel suggestion cards.',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alt text'}],
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Controls editorial order when regions are displayed together.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Use to flag regions for homepage or travel merchandising surfaces.',
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
