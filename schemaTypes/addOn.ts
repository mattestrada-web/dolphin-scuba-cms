import {defineField, defineType} from 'sanity'

/**
 * ADD-ON (upsell)
 * Maps to WeTravel /options. Gear, excursions, upgrades.
 */
export default defineType({
  name: 'addOn',
  title: 'Add-on',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Gear', value: 'gear'},
          {title: 'Excursion', value: 'excursion'},
          {title: 'Upgrade', value: 'upgrade'},
        ],
      },
    }),
    defineField({
      name: 'relatedProducts',
      title: 'Related Products',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'product'}]}],
    }),
    defineField({
      name: 'wetravel',
      title: 'WeTravel',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: [
        {name: 'option_id', type: 'string', title: 'WeTravel Option ID'},
      ],
    }),
  ],
  preview: {
    select: {name: 'name', type: 'type', price: 'price'},
    prepare({name, type, price}) {
      return {
        title: name,
        subtitle: [type, price != null ? `$${price}` : null].filter(Boolean).join(' · ') || undefined,
      }
    },
  },
})
