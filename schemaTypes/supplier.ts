import {defineField, defineType} from 'sanity'

/**
 * SUPPLIER
 * Supplier/vendor; referenced by brands and products
 */
export default defineType({
  name: 'supplier',
  title: 'Supplier',
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
      name: 'supplierId',
      title: 'Supplier ID',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
  ],
  preview: {
    select: {name: 'name'},
    prepare({name}) {
      return {
        title: name,
      }
    },
  },
})
