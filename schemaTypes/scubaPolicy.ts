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
      name: 'urlText',
      title: 'URL Text',
      type: 'string',
      description: 'Clickable link text displayed at the end of the policy body (e.g., "Learn more about DiveAssure coverage")',
      hidden: ({parent}: any) => !parent?.url,
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
