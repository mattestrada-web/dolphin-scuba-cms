import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'imageAsset',
  title: 'Image Asset',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'usageType',
      title: 'Usage Type',
      type: 'string',
      options: {
        list: [
          {title: 'Hero', value: 'hero'},
          {title: 'Gallery', value: 'gallery'},
          {title: 'Card', value: 'card'},
          {title: 'Thumbnail', value: 'thumbnail'},
          {title: 'Editorial', value: 'editorial'},
        ],
      },
    }),
    defineField({
      name: 'sourceSystem',
      title: 'Source System',
      type: 'string',
      options: {
        list: [
          {title: 'Manual Upload', value: 'manual'},
          {title: 'Lightspeed', value: 'lightspeed'},
          {title: 'WeTravel', value: 'wetravel'},
          {title: 'Ecwid', value: 'ecwid'},
          {title: 'Generated', value: 'generated'},
        ],
      },
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'reference',
      to: [{type: 'brand'}],
    }),
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{type: 'product'}],
    }),
    defineField({
      name: 'trip',
      title: 'Trip',
      type: 'reference',
      to: [{type: 'trip'}],
    }),
    defineField({
      name: 'destination',
      title: 'Destination',
      type: 'reference',
      to: [{type: 'destination'}],
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'reference',
      to: [{type: 'region'}],
    }),
    defineField({
      name: 'travelTheme',
      title: 'Travel Theme',
      type: 'reference',
      to: [{type: 'travelTheme'}],
    }),
    defineField({
      name: 'internalNotes',
      title: 'Internal Notes',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      usageType: 'usageType',
      sourceSystem: 'sourceSystem',
    },
    prepare({title, media, usageType, sourceSystem}) {
      const parts = [usageType, sourceSystem].filter(Boolean)
      return {
        title,
        subtitle: parts.length ? parts.join(' · ') : undefined,
        media,
      }
    },
  },
})
