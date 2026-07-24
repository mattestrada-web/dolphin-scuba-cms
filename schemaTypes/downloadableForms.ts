import {defineField, defineType} from 'sanity'

export const resource = defineType({
  name: 'resource',
  type: 'document',
  title: 'Resource',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'shortDescription',
      type: 'text',
      rows: 3
    }),

    defineField({
      name: 'resourceType',
      type: 'string',
      options: {
        list: [
          {title: 'Medical Form', value: 'medicalForm'},
          {title: 'Release or Waiver', value: 'release'},
          {title: 'Orientation Guide', value: 'orientationGuide'},
          {title: 'Trip Form', value: 'tripForm'},
          {title: 'FAQ', value: 'faq'},
          {title: 'Map or Directions', value: 'map'},
          {title: 'Policy', value: 'policy'},
          {title: 'Service Document', value: 'serviceDocument'},
          {title: 'Product or Return Form', value: 'merchandiseForm'},
          {title: 'External Website', value: 'externalWebsite'},
          {title: 'General Information', value: 'information'}
        ],
        layout: 'dropdown'
      },
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'resourceCategory'}]
        }
      ]
    }),

    defineField({
      name: 'audiences',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Scuba Students', value: 'scubaStudents'},
          {title: 'Swim Students', value: 'swimStudents'},
          {title: 'Trip Travelers', value: 'tripTravelers'},
          {title: 'Parents and Guardians', value: 'parents'},
          {title: 'Instructors', value: 'instructors'},
          {title: 'Retail Customers', value: 'retailCustomers'},
          {title: 'Service Customers', value: 'serviceCustomers'},
          {title: 'Staff', value: 'staff'}
        ]
      }
    }),

    defineField({
      name: 'deliveryMethod',
      type: 'string',
      options: {
        list: [
          {title: 'Uploaded File', value: 'file'},
          {title: 'External URL', value: 'externalUrl'},
          {title: 'BigCommerce Page', value: 'bigCommercePage'}
        ],
        layout: 'radio'
      },
      initialValue: 'file',
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'file',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx,.xls,.xlsx'
      },
      hidden: ({parent}) => parent?.deliveryMethod !== 'file'
    }),

    defineField({
      name: 'externalUrl',
      type: 'url',
      hidden: ({parent}) => parent?.deliveryMethod === 'file',
      validation: Rule =>
        Rule.uri({
          scheme: ['http', 'https']
        })
    }),

    defineField({
      name: 'buttonLabel',
      type: 'string',
      initialValue: 'View Resource'
    }),

    defineField({
      name: 'version',
      type: 'string'
    }),

    defineField({
      name: 'effectiveDate',
      type: 'date'
    }),

    defineField({
      name: 'expirationDate',
      type: 'date'
    }),

    defineField({
      name: 'lastReviewedAt',
      type: 'date'
    }),

    defineField({
      name: 'reviewIntervalMonths',
      type: 'number',
      initialValue: 12
    }),

    defineField({
      name: 'replacedBy',
      type: 'reference',
      to: [{type: 'resource'}]
    }),

    defineField({
      name: 'active',
      type: 'boolean',
      initialValue: true
    }),

    defineField({
      name: 'internalNotes',
      type: 'text',
      rows: 4
    })
  ],

  preview: {
    select: {
      title: 'title',
      type: 'resourceType',
      active: 'active',
      reviewed: 'lastReviewedAt'
    },
    prepare({title, type, active, reviewed}) {
      return {
        title,
        subtitle: [
          type,
          active === false ? 'Inactive' : null,
          reviewed ? `Reviewed ${reviewed}` : 'Not reviewed'
        ]
          .filter(Boolean)
          .join(' · ')
      }
    }
  }
})
