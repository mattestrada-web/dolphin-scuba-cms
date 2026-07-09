import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'brandMedia',
  title: 'Brand Media',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Brand Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g. "Primary - Light", "Icon - Dark", "Horizontal - White"',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'brandColors',
      title: 'Brand Colors',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', title: 'Name', type: 'string'},
            {name: 'hex', title: 'Hex', type: 'string'},
          ],
          preview: {
            select: {title: 'name', subtitle: 'hex'},
          },
        },
      ],
    }),
    defineField({
      name: 'socialImage',
      title: 'Social Share Image',
      type: 'image',
      description: 'Default OG image for this brand (1200x630 recommended).',
      options: {hotspot: true},
    }),
    defineField({
      name: 'additionalAssets',
      title: 'Additional Assets',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'name', media: 'logos.0.asset'},
  },
})
