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
      name: 'body',
      title: 'Policy Text',
      type: 'text',
      rows: 10,
    }),
  ],

  preview: {
    select: {
      title: 'title',
    },
  },
})
