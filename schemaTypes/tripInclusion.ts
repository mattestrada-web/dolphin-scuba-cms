import {defineField, defineType} from 'sanity'

/**
 * TRIP INCLUSION (included / not included item)
 * Maps to WeTravel /included_items and /not_included_items.
 */
export default defineType({
  name: 'tripInclusion',
  title: 'Trip Inclusion',
  type: 'document',
  fields: [
    defineField({
      name: 'trip',
      title: 'Trip',
      type: 'reference',
      to: [{type: 'trip'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Included', value: 'included'},
          {title: 'Not Included', value: 'not_included'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {trip: 'trip.title', type: 'type', title: 'title'},
    prepare({trip, type, title}) {
      return {
        title,
        subtitle: [trip, type].filter(Boolean).join(' · ') || undefined,
      }
    },
  },
})
