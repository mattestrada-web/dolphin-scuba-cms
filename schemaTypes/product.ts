import {defineArrayMember, defineField, defineType} from 'sanity'
import CategoryAutoLink from '../components/CategoryAutoLink'

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
      name: 'handle',
      title: 'Handle',
      type: 'string',
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
      description: 'Canonical or parent SKU',
    }),
    defineField({
      name: 'supplierCode',
      title: 'Supplier Code',
      type: 'string',
      description:
        'Secondary supervised match field used during upserts and cross-system reconciliation.',
    }),
    defineField({
      name: 'lightspeedProductId',
      title: 'Lightspeed Product ID',
      type: 'string',
      description: 'Product id from Lightspeed POS; used by the integration to match this document to the source record.',
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'reference',
      to: [{type: 'brand'}],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
      components: {
        input: CategoryAutoLink,
      },
      description: 'Product can appear in multiple categories (e.g. both Exposure Protection and Wetsuits).',
      validation: (Rule) =>
        Rule.custom((categories: any[] | undefined) => {
          const triggerIds = [
            'cdeb2713-a87e-4939-bc7d-b808f08cb609',
            '63422239-2494-449a-8f55-59678f95565d',
            'bf303b98-27e0-47e6-90a6-3e2e73124018',
          ]

          const hasTrigger = categories?.some((category) => triggerIds.includes(category?._ref))
          const hasLifeSupport = categories?.some(
            (category) => category?._ref === '10c65c0e-720c-4a9b-a6ee-4d6628383b7b'
          )

          if (hasTrigger && !hasLifeSupport) {
            return 'Products in Consoles, BCs, or Regulators must include Life Support'
          }

          return true
        }),
    }),
    defineField({
      name: 'suppliers',
      title: 'Suppliers',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'supplier'}]}],
    }),
    defineField({
      name: 'familyId',
      title: 'Family ID',
      type: 'string',
    }),
    defineField({
      name: 'familyName',
      title: 'Family Name',
      type: 'string',
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
      name: 'featureBullets',
      title: 'Feature Bullets',
      type: 'array',
      description: 'Short merchandising callouts used across cards and detail pages.',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.max(6).warning('Keep feature bullets concise'),
    }),
    defineField({
      name: 'imageAsset',
      title: 'Image Asset Override',
      type: 'reference',
      to: [{type: 'imageAsset'}],
      description: 'Optional curated merchandising image. Frontend should prefer this over Lightspeed image URLs when present.',
    }),
    defineField({
      name: 'lightspeedImageUrls',
      title: 'Lightspeed Image URLs',
      type: 'array',
      of: [{type: 'url'}],
      description: 'Operational product image URLs synced from Lightspeed and served from the Lightspeed CDN.',
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'imageAsset'}],
        }),
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
    defineField({
      name: 'merchandisingNotes',
      title: 'Merchandising Notes',
      type: 'text',
      rows: 3,
      description: 'Internal notes for merchandisers and content editors. Not rendered on the website.',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      slug: 'slug.current',
      imageAsset: 'imageAsset.image',
      mediaAsset: 'media.0.image',
      mediaRaw: 'media.0',
      familyName: 'familyName',
    },
    prepare({name, slug, imageAsset, mediaAsset, mediaRaw, familyName}) {
      const parts = [familyName, slug ? `/${slug}` : null].filter(Boolean)
      return {
        title: name,
        subtitle: parts.length ? parts.join(' · ') : undefined,
        media: imageAsset || mediaAsset || mediaRaw,
      }
    },
  },
})
