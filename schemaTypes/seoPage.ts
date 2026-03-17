import {defineField, defineType} from 'sanity'

/**
 * SEO PAGE (Programmatic template driver)
 * Powers pages like "Best Cold Water Regulators", "Best Travel Dive Gear"
 */
export default defineType({
  name: 'seoPage',
  title: 'SEO Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. Best Cold Water Regulators',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'introContent',
      title: 'Intro Content',
      type: 'blockContent',
    }),
    defineField({
      name: 'useCase',
      title: 'Use Case',
      type: 'reference',
      to: [{type: 'useCase'}],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      description: 'Optional — narrow by category',
    }),
    defineField({
      name: 'filters',
      title: 'Spec Filters',
      type: 'array',
      description: 'Spec-based rules: which specs to filter by on this page',
      of: [{type: 'reference', to: [{type: 'spec'}]}],
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [{type: 'faqItem'}],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {title: 'title', slug: 'slug.current', media: 'heroImage'},
    prepare({title, slug, media}) {
      return {
        title,
        subtitle: slug ? `/${slug}` : undefined,
        media,
      }
    },
  },
})
