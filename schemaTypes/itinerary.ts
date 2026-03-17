import {defineField, defineType} from 'sanity'

/**
 * ITINERARY (day/entry)
 * One document per day or segment. Maps to WeTravel /itineraries.
 */
export default defineType({
  name: 'itinerary',
  title: 'Itinerary',
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
      name: 'dayNumber',
      title: 'Day Number',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. Day 1 — Arrival',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{type: 'destination'}],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
  preview: {
    select: {trip: 'trip.title', dayNumber: 'dayNumber', title: 'title'},
    prepare({trip, dayNumber, title}) {
      return {
        title: title || `Day ${dayNumber}`,
        subtitle: trip ? `${trip} · Day ${dayNumber}` : `Day ${dayNumber}`,
      }
    },
  },
  orderings: [
    {
      title: 'Day order',
      name: 'dayOrder',
      by: [{field: 'dayNumber', direction: 'asc'}],
    },
  ],
})
