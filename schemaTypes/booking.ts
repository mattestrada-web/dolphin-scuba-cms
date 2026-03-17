import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * BOOKING (read-only from WeTravel)
 * Ingested from /trips/{trip_uuid}/bookings. Do not create manually.
 */
export default defineType({
  name: 'booking',
  title: 'Booking',
  type: 'document',
  __experimental_actions: ['update', 'publish', 'delete'],
  fields: [
    defineField({
      name: 'departure',
      title: 'Departure',
      type: 'reference',
      to: [{type: 'departure'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bookingId',
      title: 'Booking ID',
      type: 'string',
      description: 'WeTravel booking identifier',
    }),
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'participantsCount',
      title: 'Participants Count',
      type: 'number',
    }),
    defineField({
      name: 'participants',
      title: 'Participants',
      type: 'array',
      of: [defineArrayMember({type: 'participant'})],
    }),
    defineField({
      name: 'totalAmount',
      title: 'Total Amount',
      type: 'number',
    }),
    defineField({
      name: 'amountPaid',
      title: 'Amount Paid',
      type: 'number',
    }),
    defineField({
      name: 'balanceDue',
      title: 'Balance Due',
      type: 'number',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Confirmed', value: 'confirmed'},
          {title: 'Pending', value: 'pending'},
          {title: 'Canceled', value: 'canceled'},
        ],
      },
    }),
    defineField({
      name: 'discountCode',
      title: 'Discount Code',
      type: 'string',
    }),
  ],
  preview: {
    select: {customerName: 'customerName', departure: 'departure', status: 'status'},
    prepare({customerName, departure, status}) {
      return {
        title: customerName || 'Booking',
        subtitle: [departure, status].filter(Boolean).join(' · ') || undefined,
      }
    },
  },
})
