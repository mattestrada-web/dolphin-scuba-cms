import {defineField, defineType} from 'sanity'

/**
 * PARTICIPANT (embedded in booking)
 * From WeTravel booking exports / survey data.
 */
export default defineType({
  name: 'participant',
  title: 'Participant',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'answers',
      title: 'Survey Answers',
      type: 'text',
      rows: 3,
      description: 'Key-value from survey/task data (store as JSON string or notes)',
    }),
    defineField({
      name: 'documents',
      title: 'Documents',
      type: 'array',
      of: [{type: 'file'}],
      description: 'Uploaded docs (certifications, etc.)',
    }),
  ],
  preview: {
    select: {name: 'name'},
    prepare({name}) {
      return {title: name || 'Participant'}
    },
  },
})
