import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'e.g., "Pool", "Classroom 1", "Classroom 2"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{type: 'location'}],
      description: 'Which location this resource belongs to',
    }),
    defineField({
      name: 'resourceType',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Pool', value: 'pool'},
          {title: 'Classroom', value: 'classroom'},
          {title: 'Open Water Site', value: 'open_water'},
          {title: 'Boat', value: 'boat'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'capacity',
      title: 'Max Capacity',
      type: 'number',
      description: 'Maximum number of students/participants',
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {title: 'name', type: 'resourceType', locationName: 'location.name'},
    prepare({title, type, locationName}) {
      return {
        title,
        subtitle: [type, locationName].filter(Boolean).join(' — '),
      }
    },
  },
})
