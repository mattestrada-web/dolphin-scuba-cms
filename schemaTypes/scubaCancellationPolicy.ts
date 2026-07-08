import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'scubaCancellationPolicy',
  title: 'Cancellation Policy',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Cancellation Policy',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'body',
      title: 'Policy Text',
      type: 'text',
      description: 'Cancellation policy content',
      rows: 10,
    }),
  ],

  preview: {
    select: {
      title: 'title',
    },
  },
})
