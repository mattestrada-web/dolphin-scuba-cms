import {defineField, defineType} from 'sanity'

/**
 * STAFF (minimal for Travel/Operations)
 * Instructors, crew. Referenced by departures and classes.
 */
export default defineType({
  name: 'staff',
  title: 'Staff',
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
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'e.g. Lead Instructor, Divemaster',
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
  preview: {
    select: {name: 'name', role: 'role', media: 'photo'},
    prepare({name, role, media}) {
      return {
        title: name,
        subtitle: role ?? undefined,
        media,
      }
    },
  },
})
