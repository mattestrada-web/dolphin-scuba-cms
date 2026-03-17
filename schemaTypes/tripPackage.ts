import {defineField, defineType} from 'sanity'

/**
 * PACKAGE (pricing tier)
 * Maps to WeTravel /packages. Linked to departures. Type name tripPackage to avoid JS reserved/module conflict.
 */
export default defineType({
  name: 'tripPackage',
  title: 'Package',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'e.g. Standard Cabin, Deluxe Suite',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'basePrice',
      title: 'Base Price',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      description: 'e.g. USD',
      initialValue: 'USD',
    }),
    defineField({
      name: 'occupancyType',
      title: 'Occupancy',
      type: 'string',
      options: {
        list: [
          {title: 'Single', value: 'single'},
          {title: 'Double', value: 'double'},
          {title: 'Shared', value: 'shared'},
        ],
      },
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity',
      type: 'number',
      description: 'Spots for this package',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'includedItems',
      title: 'Included',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'notIncludedItems',
      title: 'Not Included',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'wetravel',
      title: 'WeTravel',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: [
        {name: 'package_id', type: 'string', title: 'WeTravel Package ID'},
      ],
    }),
  ],
  preview: {
    select: {name: 'name', basePrice: 'basePrice', currency: 'currency'},
    prepare({name, basePrice, currency}) {
      return {
        title: name,
        subtitle: basePrice != null && currency ? `${currency} ${basePrice}` : undefined,
      }
    },
  },
})
