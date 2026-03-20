import {defineField, defineType} from 'sanity'

/**
 * TRAVEL EXPLORER ITEM
 * Lets editors feature either a geographic region or a travel theme in the same UI surface.
 */
export default defineType({
  name: 'travelExplorerItem',
  title: 'Travel Explorer Item',
  type: 'object',
  fields: [
    defineField({
      name: 'item',
      title: 'Item',
      type: 'reference',
      to: [{type: 'region'}, {type: 'travelTheme'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'labelOverride',
      title: 'Label Override',
      type: 'string',
      description: 'Optional override for the displayed name on this surface only.',
    }),
    defineField({
      name: 'summaryOverride',
      title: 'Summary Override',
      type: 'text',
      rows: 3,
      description: 'Optional override for the displayed summary on this surface only.',
    }),
    defineField({
      name: 'imageOverride',
      title: 'Image Override',
      type: 'image',
      description: 'Optional image replacement for this surface only.',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alt text'}],
    }),
  ],
  preview: {
    select: {
      title: 'labelOverride',
      fallbackTitle: 'item.name',
      summaryOverride: 'summaryOverride',
      fallbackSummary: 'item.summary',
      media: 'imageOverride',
      fallbackMedia: 'item.image',
      type: 'item._type',
    },
    prepare({title, fallbackTitle, summaryOverride, fallbackSummary, media, fallbackMedia, type}: any) {
      return {
        title: title || fallbackTitle || 'Travel Explorer Item',
        subtitle: [type === 'travelTheme' ? 'Theme' : type === 'region' ? 'Region' : null, summaryOverride || fallbackSummary]
          .filter(Boolean)
          .join(' · '),
        media: media || fallbackMedia,
      }
    },
  },
})
