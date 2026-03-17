import {defineField, defineType} from 'sanity'

/**
 * CATEGORY
 * Product category with optional parent for hierarchy; filters reference specs
 */
export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'parent',
      title: 'Parent Category',
      type: 'reference',
      to: [{type: 'category'}],
      description: 'Leave empty for top-level categories',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      description: 'Used for category listing / SEO',
      rows: 2,
    }),
    defineField({
      name: 'filters',
      title: 'Filter Specs',
      type: 'array',
      description: 'Which specs to show as filters for this category',
      of: [{type: 'reference', to: [{type: 'spec'}]}],
    }),
  ],
  preview: {
    select: {name: 'name', slug: 'slug.current'},
    prepare({name, slug}) {
      return {
        title: name,
        subtitle: slug ? `/${slug}` : undefined,
      }
    },
  },
})
