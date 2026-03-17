import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * TRIP (MASTER ENTITY)
 * Template/concept — NOT a single departure. CMS = canonical; WeTravel = booking projection.
 */
export default defineType({
  name: 'trip',
  title: 'Trip',
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
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Active', value: 'active'},
          {title: 'Archived', value: 'archived'},
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
    }),
    defineField({
      name: 'destination',
      title: 'Destination',
      type: 'reference',
      to: [{type: 'destination'}],
    }),
    defineField({
      name: 'vessel',
      title: 'Vessel / Resort',
      type: 'reference',
      to: [{type: 'vessel'}],
    }),
    defineField({
      name: 'tripType',
      title: 'Trip Type',
      type: 'string',
      options: {
        list: [
          {title: 'Liveaboard', value: 'liveaboard'},
          {title: 'Resort', value: 'resort'},
          {title: 'Local', value: 'local'},
          {title: 'Training', value: 'training'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'useCases',
      title: 'Use Cases',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'useCase'}]}],
      description: 'Conditions / themes — links SEO, products, recommendations',
    }),
    defineField({
      name: 'recommendedProducts',
      title: 'Recommended Products',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'product'}]}],
      description: 'Gear for packing lists, bundles, upsells',
    }),
    defineField({
      name: 'requiredCertifications',
      title: 'Required Certifications',
      type: 'array',
      of: [{type: 'string'}],
      description: 'e.g. Open Water Diver',
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [{name: 'alt', type: 'string', title: 'Alt text'}],
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
    defineField({
      name: 'wetravel',
      title: 'WeTravel',
      type: 'object',
      description: 'Sync layer — CMS is canonical; WeTravel is booking projection',
      options: {collapsible: true, collapsed: true},
      fields: [
        {name: 'trip_uuid', type: 'string', title: 'WeTravel Trip UUID', description: 'External ID'},
        {
          name: 'syncStatus',
          type: 'string',
          title: 'Sync Status',
          options: {
            list: [
              {title: 'Not synced', value: 'none'},
              {title: 'Synced', value: 'synced'},
              {title: 'Error', value: 'error'},
            ],
          },
        },
        {name: 'lastSyncedAt', type: 'datetime', title: 'Last Synced'},
      ],
    }),
  ],
  preview: {
    select: {title: 'title', slug: 'slug.current', destination: 'destination', media: 'media.0'},
    prepare({title, slug, destination, media}) {
      return {
        title,
        subtitle: slug ? `/${slug}` : undefined,
        media,
      }
    },
  },
})
