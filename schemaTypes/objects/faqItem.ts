import {defineField, defineType} from 'sanity'

/**
 * FAQ Item (embedded)
 * Inline question/answer for use on seoPage and elsewhere
 */
export default defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {question: 'question'},
    prepare({question}) {
      return {
        title: question || 'FAQ',
      }
    },
  },
})
