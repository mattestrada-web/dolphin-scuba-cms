import {defineField, defineType} from 'sanity'

/**
 * SEO (Shared)
 * Reusable SEO metadata — title, description, optional keywords (internal only)
 */
export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Meta Title',
      type: 'string',
      description: 'Title for search engines and sharing',
      validation: (Rule) => Rule.max(60).warning('Recommended under 60 characters'),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      description: 'Description for search engines and sharing',
      rows: 2,
      validation: (Rule) => Rule.max(160).warning('Recommended under 160 characters'),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'string',
      description: 'Optional; for internal use only (not typically used by search engines)',
    }),
  ],
})
