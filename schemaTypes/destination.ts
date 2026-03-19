import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * DESTINATION
 * Where trips go; connects to use cases and featured products
 */
export default defineType({
  name: 'destination',
  title: 'Destination',
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
      options: {source: 'name', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      description: 'e.g. Caribbean, Pacific',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'waterTempRange',
      title: 'Water Temp Range',
      type: 'string',
      description: 'e.g. 72–78°F',
    }),
    defineField({
      name: 'visibilityRange',
      title: 'Visibility Range',
      type: 'string',
      description: 'e.g. 50–100 ft',
    }),
    defineField({
      name: 'conditions',
      title: 'Conditions',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Current, visibility, etc.',
    }),
    defineField({
      name: 'marineLifeHighlights',
      title: 'Marine Life Highlights',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Notable species (e.g. Manta rays, Reef sharks, Sea turtles)',
    }),
    defineField({
      name: 'signatureSites',
      title: 'Signature Sites',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Famous dive sites (e.g. Blue Corner, Shark Reef)',
    }),
    defineField({
      name: 'useCases',
      title: 'Use Cases',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'useCase'}]}],
    }),
    defineField({
      name: 'featuredProducts',
      title: 'Featured Products',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'product'}]}],
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
  ],
  preview: {
    select: {name: 'name', region: 'region', media: 'media.0'},
    prepare({name, region, media}) {
      return {
        title: name,
        subtitle: region ?? undefined,
        media,
      }
    },
  },
})
