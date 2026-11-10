import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'scubaSchedule',
  title: 'Class Schedule',
  type: 'document',
  fields: [
    defineField({
      name: 'classCode',
      title: 'Class Code',
      type: 'string',
      description: 'Short unique identifier (e.g., OW-0714-ME)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Auto-generated schedule title (e.g. "SSI Open Water Diver: Nov 19, 2026 with Julie Estrada")',
      readOnly: true,
    }),
    defineField({
      name: 'scubaClass',
      title: 'Class',
      type: 'reference',
      to: [{type: 'scubaClass'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'locations',
      title: 'Locations',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'location'}]}],
    }),
    defineField({
      name: 'instructors',
      title: 'Instructors',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'diveProfessional'}]}],
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price in cents (e.g. 39900 = $399.00)',
    }),
    defineField({
      name: 'days',
      title: 'Schedule Days',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'scheduleDay',
          title: 'Day',
          fields: [
            defineField({
              name: 'date',
              title: 'Date',
              type: 'date',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'startTime',
              title: 'Start Time',
              type: 'string',
              description: '24-hour format HH:MM (e.g. "09:00", "17:30")',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'endTime',
              title: 'End Time',
              type: 'string',
              description: '24-hour format HH:MM (e.g. "17:00", "21:30")',
            }),
            defineField({
              name: 'location',
              title: 'Location',
              type: 'reference',
              to: [{type: 'location'}],
            }),
            defineField({
              name: 'resources',
              title: 'Resources',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'resourceBooking',
                  title: 'Resource Booking',
                  fields: [
                    defineField({
                      name: 'resource',
                      title: 'Resource',
                      type: 'reference',
                      to: [{type: 'resource'}],
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'startTime',
                      title: 'Start Time',
                      type: 'string',
                      description: '24-hour format HH:MM',
                    }),
                    defineField({
                      name: 'endTime',
                      title: 'End Time',
                      type: 'string',
                      description: '24-hour format HH:MM',
                    }),
                  ],
                  preview: {
                    select: {name: 'resource.name', start: 'startTime', end: 'endTime'},
                    prepare({name, start, end}: any) {
                      const time = start && end ? `${start} – ${end}` : start || end || ''
                      return {title: name || 'Resource', subtitle: time}
                    },
                  },
                },
              ],
              description: 'Which resources are booked for this day, with time allocations',
            }),
            defineField({
              name: 'notes',
              title: 'Notes',
              type: 'string',
              description: 'e.g., "Pool session", "Classroom only", "Open water dive"',
            }),
          ],
          preview: {
            select: {date: 'date', start: 'startTime', end: 'endTime', locationName: 'location.name', notes: 'notes'},
            prepare({date, start, end, locationName, notes}) {
              const time = end ? `${start} - ${end}` : start
              return {
                title: date || 'TBD',
                subtitle: [time, locationName, notes].filter(Boolean).join(' — '),
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'maxStudents',
      title: 'Max Students',
      type: 'number',
      description: 'Maximum number of students (overrides class default)',
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'openSpots',
      title: 'Open Spots',
      type: 'number',
      description: 'Available spots remaining (synced from Flipper2)',
      readOnly: true,
    }),
    defineField({
      name: 'hasWaitlist',
      title: 'Has Waitlist',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'sawyerId',
      title: 'Sawyer ID',
      type: 'number',
      description: 'Sawyer schedule ID for booking integration',
      readOnly: true,
    }),
    defineField({
      name: 'bookingUrl',
      title: 'Booking URL',
      type: 'url',
      description: 'Direct link to Sawyer booking page',
    }),
    defineField({
      name: 'isPrivate',
      title: 'Private',
      type: 'boolean',
      description: 'Private class — not shown on public schedule',
      initialValue: false,
    }),
    defineField({
      name: 'designation',
      title: 'Designation',
      type: 'string',
      description: 'Schedule designation (e.g. EX for Explorer)',
    }),
    defineField({
      name: 'lsProductId',
      title: 'Lightspeed Product ID',
      type: 'string',
      description: 'Linked Lightspeed product UUID',
      readOnly: true,
    }),
    defineField({
      name: 'promoLabel',
      title: 'Promo Label',
      type: 'string',
      description: 'Promotion name (e.g. "Black Friday", "Holiday Special") — also used as a filter for marketing campaigns',
    }),
    defineField({
      name: 'promoBadge',
      title: 'Promo Badge',
      type: 'string',
      description: 'Text overlay on thumbnail (e.g. "SALE", "$49.97")',
    }),
    defineField({
      name: 'promoPrice',
      title: 'Promo Price',
      type: 'number',
      description: 'Promotional price in cents (e.g. 4997 = $49.97). Overrides schedule price when set.',
    }),
    defineField({
      name: 'policies',
      title: 'Policies',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'scubaPolicy'}]}],
      description: 'Override class-level policies for this schedule. If empty, inherits from the linked class.',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Scheduled', value: 'scheduled'},
          {title: 'In Progress', value: 'in_progress'},
          {title: 'Completed', value: 'completed'},
          {title: 'Cancelled', value: 'cancelled'},
        ],
      },
      initialValue: 'scheduled',
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      className: 'scubaClass.title',
      locationName: 'locations.0.name',
      instructorName: 'instructors.0.name',
      status: 'status',
      firstDate: 'days.0.date',
      lastDate: 'days.-1.date',
    },
    prepare({className, locationName, instructorName, status, firstDate, lastDate}: any) {
      // Build date range display
      let dateStr = ''
      if (firstDate) {
        const opts: Intl.DateTimeFormatOptions = {month: 'short', day: 'numeric', year: 'numeric'}
        const start = new Date(firstDate + 'T12:00:00')
        const startStr = start.toLocaleDateString('en-US', opts)
        if (lastDate && lastDate !== firstDate) {
          const end = new Date(lastDate + 'T12:00:00')
          const endStr = end.toLocaleDateString('en-US', opts)
          dateStr = `${startStr} - ${endStr}`
        } else {
          dateStr = startStr
        }
      }
      const title = [className, locationName, dateStr, instructorName]
        .filter(Boolean)
        .join(' | ')
      return {
        title: title || 'Untitled Schedule',
        subtitle: status || '',
      }
    },
  },
  orderings: [
    {
      title: 'Date (Newest)',
      name: 'dateDesc',
      by: [{field: 'days.0.date', direction: 'desc'}],
    },
    {
      title: 'Date (Oldest)',
      name: 'dateAsc',
      by: [{field: 'days.0.date', direction: 'asc'}],
    },
  ],
})
