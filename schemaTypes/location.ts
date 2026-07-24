import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'location',
  title: 'Location',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Street Address',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
    }),
    defineField({
      name: 'zip',
      title: 'ZIP Code',
      type: 'string',
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
    defineField({
      name: 'mapUrl',
      title: 'Google Maps Link',
      type: 'url',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'parking',
      title: 'Parking',
      type: 'text',
      rows: 4,
      description: 'Parking instructions and availability',
    }),
    defineField({
      name: 'restroomsOnsite',
      title: 'Restrooms Onsite',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'waterTemperatureRange',
      title: 'Water Temperature Range at Depth',
      type: 'string',
      description: 'e.g., "48-55F"',
    }),
    defineField({
      name: 'typicalVisibility',
      title: 'Typical Visibility',
      type: 'string',
      description: 'e.g., "10-25 feet"',
    }),
    defineField({
      name: 'eapLink',
      title: 'Emergency Action Plan (EAP)',
      type: 'url',
      description: 'Link to the EAP document (Google Doc)',
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'name'},
  },
})
