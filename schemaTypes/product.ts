import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * PRODUCT (CORE)
 * Canonical product document. Everything else can reference this.
 */
export default defineType({
  name: 'product',
  title: 'Product',
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
      name: 'sku',
      title: 'SKU',
      type: 'string',
      description: 'Canonical or parent SKU',
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'reference',
      to: [{type: 'brand'}],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text',
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'specs',
      title: 'Specs',
      type: 'array',
      of: [{type: 'specValue'}],
    }),
    defineField({
      name: 'useCases',
      title: 'Use Cases',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'useCase'}]}],
    }),
    defineField({
      name: 'compatibleWith',
      title: 'Compatible With',
      type: 'array',
      description: 'Products this is compatible with',
      of: [{type: 'reference', to: [{type: 'product'}]}],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {title: 'title', slug: 'slug.current', media: 'media.0'},
    prepare({title, slug, media}) {
      return {
        title,
        subtitle: slug ? `/${slug}` : undefined,
        media,
      }
    },
  },
})
