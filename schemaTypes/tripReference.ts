import {defineField, defineType} from 'sanity'

/**
 * TRIP REFERENCE
 * Lightweight dive trip metadata synced from ERP
 * Allows visual selection in Sanity, but ERP remains source of truth
 */

export default defineType({
  name: 'tripReference',
  title: 'Trip Reference',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'tripId',
      title: 'Trip ID',
      type: 'string',
      description: 'Unique trip ID from ERP',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'destination',
      title: 'Destination',
      type: 'string',
      description: 'e.g., Maldives, Palau, Cozumel',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'tripName',
      title: 'Trip Name',
      type: 'string',
      description: 'Full trip name/title',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'thumbnail',
      title: 'Destination Image',
      type: 'image',
      description: 'Hero image for this destination',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      description: 'Brief trip description for previews',
      rows: 2,
      validation: (Rule) => Rule.max(200),
    }),

    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "7 Days / 6 Nights"',
    }),

    defineField({
      name: 'basePrice',
      title: 'Starting Price (Reference)',
      type: 'number',
      description: 'For display only - real pricing from ERP',
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: 'nextDeparture',
      title: 'Next Departure Date',
      type: 'date',
      description: 'Reference only - real availability from ERP',
    }),

    defineField({
      name: 'availableSpots',
      title: 'Available Spots',
      type: 'number',
      description: 'Reference only - real availability from ERP',
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: 'tripType',
      title: 'Trip Type',
      type: 'string',
      options: {
        list: [
          {title: 'Liveaboard', value: 'liveaboard'},
          {title: 'Resort', value: 'resort'},
          {title: 'Day Trips', value: 'daytrip'},
          {title: 'Adventure', value: 'adventure'},
        ],
      },
    }),

    defineField({
      name: 'featured',
      title: 'Featured Trip',
      type: 'boolean',
      description: 'Highlight as a featured destination',
      initialValue: false,
    }),

    defineField({
      name: 'lastSyncedAt',
      title: 'Last Synced',
      type: 'datetime',
      readOnly: true,
    }),
  ],

  preview: {
    select: {
      title: 'tripName',
      destination: 'destination',
      media: 'thumbnail',
      featured: 'featured',
    },
    prepare({title, destination, media, featured}: any) {
      return {
        title,
        subtitle: `${destination} ${featured ? '⭐' : ''}`,
        media,
      }
    },
  },
}, {strict: false})
