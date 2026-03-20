import {defineField, defineType} from 'sanity'

/**
 * FEATURED PRODUCT ITEM
 * Placement-level merchandising controls for homepage and shop surfaces.
 */
export default defineType({
  name: 'featuredProductItem',
  title: 'Featured Product Item',
  type: 'object',
  fields: [
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{type: 'product'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Optional short label above the product title for this placement only.',
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      description: 'Optional badge label such as New, Staff Pick, or Travel Ready.',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      description: 'Optional button label override for this placement.',
    }),
    defineField({
      name: 'shortDescriptionOverride',
      title: 'Short Description Override',
      type: 'text',
      rows: 3,
      description: 'Optional placement-specific marketing copy.',
    }),
    defineField({
      name: 'highlightSpecs',
      title: 'Highlight Specs',
      type: 'array',
      description: 'Short chips or feature callouts for this placement.',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.max(4).warning('Use up to four callouts'),
    }),
    defineField({
      name: 'alternateImage',
      title: 'Alternate Image',
      type: 'image',
      description: 'Optional replacement image for this placement only.',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alt text'}],
    }),
    defineField({
      name: 'hidePrice',
      title: 'Hide Price',
      type: 'boolean',
      description: 'Use when this placement should suppress price display.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'product.name',
      subtitle: 'badge',
      media: 'alternateImage',
      fallbackMedia: 'product.media.0',
    },
    prepare({title, subtitle, media, fallbackMedia}: any) {
      return {
        title: title || 'Featured Product',
        subtitle: subtitle || 'Default placement',
        media: media || fallbackMedia,
      }
    },
  },
})
