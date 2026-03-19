import {defineField, defineType} from 'sanity'

/**
 * USE CASE (SEO + Intelligence Engine)
 * e.g. Cold Water Diving, Travel Dive Gear — drives programmatic SEO and product discovery
 */
export default defineType({
  name: 'useCase',
  title: 'Use Case',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'e.g. Cold Water Diving, Travel Dive Gear',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'requiredProducts',
      title: 'Required Products',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'product'}]}],
    }),
    defineField({
      name: 'recommendedProducts',
      title: 'Recommended Products',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'product'}]}],
    }),
    defineField({
      name: 'relatedCategories',
      title: 'Related Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
    }),
  ],
  preview: {
    select: {name: 'name', slug: 'slug.current', media: 'heroImage'},
    prepare({name, slug, media}) {
      return {
        title: name,
        subtitle: slug ? `/${slug}` : undefined,
        media,
      }
    },
  },
})
