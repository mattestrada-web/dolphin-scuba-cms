import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * DEPARTURE
 * 1:1 with a WeTravel trip instance (dates, capacity, packages). CMS pushes; bookings pulled.
 */
export default defineType({
  name: 'departure',
  title: 'Departure',
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
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Planned', value: 'planned'},
          {title: 'Live', value: 'live'},
          {title: 'Sold Out', value: 'sold_out'},
          {title: 'Completed', value: 'completed'},
        ],
        layout: 'radio',
      },
      initialValue: 'planned',
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'spotsRemaining',
      title: 'Spots Remaining',
      type: 'number',
      description: 'Can be synced from WeTravel bookings',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'packages',
      title: 'Packages',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'tripPackage'}]}],
    }),
    defineField({
      name: 'addOns',
      title: 'Add-ons',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'addOn'}]}],
    }),
    defineField({
      name: 'instructors',
      title: 'Instructors',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'staff'}]}],
    }),
    defineField({
      name: 'pricingSummary',
      title: 'Pricing Summary',
      type: 'string',
      description: 'e.g. From $2,499',
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'USD',
    }),
    defineField({
      name: 'wetravel',
      title: 'WeTravel',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: [
        {name: 'trip_uuid', type: 'string', title: 'WeTravel Trip UUID', description: 'Maps to /draft_trips'},
        {name: 'booking_url', type: 'url', title: 'Booking URL'},
        {name: 'published', type: 'boolean', title: 'Published on WeTravel', initialValue: false},
        {name: 'lastSyncedAt', type: 'datetime', title: 'Last Synced'},
      ],
    }),
  ],
  preview: {
    select: {
      trip: 'trip.title',
      start: 'startDate',
      end: 'endDate',
      status: 'status',
    },
    prepare({trip, start, end, status}) {
      return {
        title: trip ? `${trip} — ${start ?? '…'}` : start ?? 'Departure',
        subtitle: [end, status].filter(Boolean).join(' · ') || undefined,
      }
    },
  },
})
