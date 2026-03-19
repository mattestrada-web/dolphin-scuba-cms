import {defineField, defineType} from 'sanity'

/**
 * CATEGORY
 * Product category with optional parent(s) for hierarchy/layout; filters reference specs.
 * Multiple parents allow the same category to appear in several sections (e.g. Masks under both
 * Masks, Snorkels & Fins and Spearfishing).
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
      name: 'categoryId',
      title: 'Category ID',
      type: 'string',
    }),
    defineField({
      name: 'parents',
      title: 'Parent Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
      description: 'Where this category appears in the site (e.g. Masks under Masks/Fins and Spearfishing). Leave empty for top-level.',
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
