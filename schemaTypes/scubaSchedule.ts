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
    }),
    defineField({
      name: 'scubaClass',
      title: 'Class',
      type: 'reference',
      to: [{type: 'scubaClass'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{type: 'location'}],
    }),
    defineField({
      name: 'instructor',
      title: 'Instructor',
      type: 'reference',
      to: [{type: 'diveProfessional'}],
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'e.g., "$399", "$1,650"',
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
              description: 'e.g., "9:00am", "5:30pm"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'endTime',
              title: 'End Time',
              type: 'string',
              description: 'e.g., "5:00pm", "9:30pm"',
            }),
            defineField({
              name: 'resources',
              title: 'Resources',
              type: 'array',
              of: [{type: 'reference', to: [{type: 'resource'}]}],
              description: 'Which resources are needed for this day (Pool, Classroom, etc.)',
            }),
            defineField({
              name: 'notes',
              title: 'Notes',
              type: 'string',
              description: 'e.g., "Pool session", "Classroom only", "Open water dive"',
            }),
          ],
          preview: {
            select: {date: 'date', start: 'startTime', end: 'endTime', notes: 'notes'},
            prepare({date, start, end, notes}) {
              const time = end ? `${start} - ${end}` : start
              return {
                title: date || 'TBD',
                subtitle: [time, notes].filter(Boolean).join(' — '),
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'openSpots',
      title: 'Open Spots',
      type: 'number',
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
      locationName: 'location.name',
      instructorName: 'instructor.name',
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
