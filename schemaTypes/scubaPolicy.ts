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
      name: 'document',
      title: 'Document',
      type: 'file',
      description: 'Upload a PDF or other document (stored in Sanity CDN)',
      options: {
        accept: '.pdf,.doc,.docx',
      },
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Link to external policy document — or leave blank to use the uploaded document above',
    }),
    defineField({
      name: 'urlText',
      title: 'URL Text',
      type: 'string',
      description: 'Clickable link text displayed at the end of the policy body (e.g., "Learn more about DiveAssure coverage")',
      hidden: ({parent}: any) => !parent?.url && !parent?.document,
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
