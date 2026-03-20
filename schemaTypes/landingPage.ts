import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * LANDING PAGE
 * One config document per section: Shop, Trips, Classes, Swim.
 * Each is a singleton (fixed documentId). Powers /shop, /trips, /classes, /swim.
 */
const PAGE_TYPES = [
  {title: 'Shop / Webstore', value: 'shop'},
  {title: 'Trips', value: 'trips'},
  {title: 'Scuba Classes', value: 'classes'},
  {title: 'Swim Lessons', value: 'swim'},
]

export default defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      options: {
        list: PAGE_TYPES,
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'For your reference (e.g. "Shop Landing")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'e.g. "shop" → /shop. Leave empty to use default for this page type.',
      options: {
        source: 'title',
        maxLength: 32,
      },
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      options: {collapsible: true, collapsed: false},
      fields: [
        {name: 'headline', type: 'string', title: 'Headline'},
        {name: 'subheadline', type: 'text', title: 'Subheadline', rows: 2},
        {name: 'image', type: 'image', title: 'Background Image', options: {hotspot: true}},
      ],
    }),
    defineField({
      name: 'intro',
      title: 'Intro Content',
      type: 'blockContent',
      description: 'Rich text above the featured items',
    }),
    defineField({
      name: 'featuredProducts',
      title: 'Featured Products',
      type: 'array',
      of: [defineArrayMember({type: 'featuredProductItem'})],
      hidden: ({document}) => document?.pageType !== 'shop',
      validation: (Rule) => Rule.max(12),
    }),
    defineField({
      name: 'featuredTrips',
      title: 'Featured Trips',
      type: 'array',
      description: 'Select from Travel → Trips (canonical trip intelligence)',
      of: [defineArrayMember({type: 'reference', to: [{type: 'trip'}]})],
      hidden: ({document}) => document?.pageType !== 'trips',
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: 'featuredClasses',
      title: 'Featured Scuba Classes',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'scubaClassReference'}]})],
      hidden: ({document}) => document?.pageType !== 'classes',
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: 'featuredSwimLessons',
      title: 'Featured Swim Lessons',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'swimLessonReference'}]})],
      hidden: ({document}) => document?.pageType !== 'swim',
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {title: 'title', pageType: 'pageType'},
    prepare({title, pageType}) {
      const label = PAGE_TYPES.find((p) => p.value === pageType)?.title ?? pageType
      return {
        title: title || label,
        subtitle: `Landing: ${label}`,
      }
    },
  },
})
