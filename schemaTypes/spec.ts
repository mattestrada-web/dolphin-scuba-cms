import {defineField, defineType} from 'sanity'

/**
 * SPEC
 * Critical for filtering + programmatic SEO (e.g. Cold Water Rated, Weight)
 */
export default defineType({
  name: 'spec',
  title: 'Spec',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'e.g. "Cold Water Rated", "Weight"',
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
      name: 'type',
      title: 'Value Type',
      type: 'string',
      options: {
        list: [
          {title: 'Boolean', value: 'boolean'},
          {title: 'Number', value: 'number'},
          {title: 'Text', value: 'text'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'unit',
      title: 'Unit',
      type: 'string',
      description: 'Optional (e.g. "lbs", "°F")',
    }),
    defineField({
      name: 'group',
      title: 'Group',
      type: 'string',
      description: 'e.g. Performance, Physical',
    }),
  ],
  preview: {
    select: {name: 'name', type: 'type', group: 'group'},
    prepare({name, type, group}) {
      return {
        title: name,
        subtitle: [type, group].filter(Boolean).join(' · ') || undefined,
      }
    },
  },
})
