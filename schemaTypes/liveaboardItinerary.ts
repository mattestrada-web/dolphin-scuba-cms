import {defineField, defineType} from 'sanity'

/**
 * LIVEABOARD ITINERARY
 * A named route/experience for a vessel — connects a liveaboard to a destination.
 * e.g. "Socorro Islands" on M/V Valentina: 10 days, up to 40 dives.
 */
export default defineType({
  name: 'liveaboardItinerary',
  title: 'Liveaboard Itinerary',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'e.g. Socorro Islands, Central Atolls Crossing',
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
      name: 'vessel',
      title: 'Vessel',
      type: 'reference',
      to: [{type: 'vessel'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'destination',
      title: 'Destination',
      type: 'reference',
      to: [{type: 'destination'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'days',
      title: 'Number of Days',
      type: 'number',
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'maxDives',
      title: 'Max Number of Dives',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'waterTemp',
      title: 'Water Temperature',
      type: 'string',
      description: 'e.g. 72-78°F',
    }),
    defineField({
      name: 'visibility',
      title: 'Visibility',
      type: 'string',
      description: 'e.g. 50-100 ft',
    }),
    defineField({
      name: 'skillLevel',
      title: 'Skill Level',
      type: 'string',
      options: {
        list: [
          {title: 'Beginner (Open Water)', value: 'beginner'},
          {title: 'Intermediate (Advanced OW)', value: 'intermediate'},
          {title: 'Advanced (Deep/Nitrox)', value: 'advanced'},
          {title: 'Expert (Technical/XR)', value: 'expert'},
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      vessel: 'vessel.name',
      destination: 'destination.name',
      days: 'days',
    },
    prepare({name, vessel, destination, days}) {
      const parts = [vessel, destination, days ? `${days} days` : null].filter(Boolean)
      return {
        title: name,
        subtitle: parts.length ? parts.join(' · ') : undefined,
      }
    },
  },
})
