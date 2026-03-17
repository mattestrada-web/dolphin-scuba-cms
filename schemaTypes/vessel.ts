import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * VESSEL / RESORT
 * Liveaboard or resort; linked from trips
 */
export default defineType({
  name: 'vessel',
  title: 'Vessel / Resort',
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
      options: {source: 'name', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Liveaboard', value: 'liveaboard'},
          {title: 'Resort', value: 'resort'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity',
      type: 'number',
      description: 'Max guests',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'cabinTypes',
      title: 'Cabin Types',
      type: 'array',
      of: [{type: 'string'}],
      description: 'e.g. Standard, Deluxe, Suite',
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [{name: 'alt', type: 'string', title: 'Alt text'}],
        }),
      ],
    }),
  ],
  preview: {
    select: {name: 'name', type: 'type', media: 'media.0'},
    prepare({name, type, media}) {
      return {
        title: name,
        subtitle: type ?? undefined,
        media,
      }
    },
  },
})
