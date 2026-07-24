import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'scubaPolicy',
  title: 'Policy',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Link to the full policy document (e.g., PDF, Google Doc)',
    }),
    defineField({
      name: 'body',
      title: 'Full Policy Text',
      type: 'text',
      rows: 10,
      description: 'Optional inline policy text',
    }),
  ],

  preview: {
    select: {
      title: 'title',
    },
  },
})
