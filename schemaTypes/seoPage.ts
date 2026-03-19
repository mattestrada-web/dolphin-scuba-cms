import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * SEO PAGE
 * Flexible, programmatic SEO page model. Presentation layer: pulls products by useCase/category,
 * supports editorial override via relatedProducts. Use Case drives filtering; category organizes catalog.
 */
const PAGE_TYPES = [
  {title: 'Use Case Page', value: 'use_case'},
  {title: 'Category Page', value: 'category'},
  {title: 'Guide', value: 'guide'},
  {title: 'Comparison', value: 'comparison'},
  {title: 'Landing Page', value: 'landing'},
] as const

export default defineType({
  name: 'seoPage',
  title: 'SEO Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
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
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      options: {
        list: PAGE_TYPES,
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'useCase',
      title: 'Use Case',
      type: 'reference',
      to: [{type: 'useCase'}],
      description: 'Drives product filtering and SEO for use case pages',
      hidden: ({document}) => document?.pageType !== 'use_case',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      description: 'Organizes catalog structure for category pages',
      hidden: ({document}) => document?.pageType !== 'category',
    }),
    defineField({
      name: 'relatedProducts',
      title: 'Related Products',
      type: 'array',
      description: 'Editorial override: hand-pick products to feature',
      of: [{type: 'reference', to: [{type: 'product'}]}],
    }),
    defineField({
      name: 'introContent',
      title: 'Intro Content',
      type: 'blockContent',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'seoPageSection',
          title: 'Section',
          fields: [
            {name: 'heading', type: 'string', title: 'Heading'},
            {name: 'body', type: 'blockContent', title: 'Body'},
            {
              name: 'faq',
              type: 'array',
              title: 'FAQ',
              of: [{type: 'faqItem'}],
            },
          ],
          preview: {
            select: {heading: 'heading'},
            prepare({heading}) {
              return {title: heading || 'Section'}
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Meta Title',
          validation: (Rule) => Rule.max(60).warning('Recommended under 60 characters'),
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Meta Description',
          rows: 2,
          validation: (Rule) => Rule.max(160).warning('Recommended under 160 characters'),
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'title', slug: 'slug.current', pageType: 'pageType'},
    prepare({title, slug, pageType}) {
      const label = PAGE_TYPES.find((p) => p.value === pageType)?.title ?? pageType
      return {
        title,
        subtitle: [slug ? `/${slug}` : null, label].filter(Boolean).join(' · ') || undefined,
      }
    },
  },
})
