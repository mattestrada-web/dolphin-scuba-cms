import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'diveProfessional',
  title: 'Dive Professional',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ssiProNumber',
      title: 'SSI Pro Number',
      type: 'string',
    }),
    defineField({
      name: 'certificationLevel',
      title: 'Certification Level',
      type: 'string',
      options: {
        list: [
          {title: 'Dive Guide', value: 'dive_guide'},
          {title: 'Divemaster', value: 'divemaster'},
          {title: 'Assistant Instructor', value: 'assistant_instructor'},
          {title: 'Instructor', value: 'instructor'},
          {title: 'Divemaster Instructor', value: 'divemaster_instructor'},
          {title: 'Master Instructor', value: 'master_instructor'},
          {title: 'Assistant Instructor Trainer', value: 'assistant_instructor_trainer'},
          {title: 'Instructor Trainer', value: 'instructor_trainer'},
          {title: 'International Training Director', value: 'international_training_director'},
        ],
      },
    }),
    defineField({
      name: 'teaches',
      title: 'Teaches',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'scubaClass'}]}],
      description: 'Classes this instructor is qualified to teach',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
  preview: {
    select: {name: 'name', level: 'certificationLevel', media: 'photo'},
    prepare({name, level, media}) {
      const levels: Record<string, string> = {
        dive_guide: 'Dive Guide',
        divemaster: 'Divemaster',
        assistant_instructor: 'Assistant Instructor',
        instructor: 'Instructor',
        divemaster_instructor: 'Divemaster Instructor',
        master_instructor: 'Master Instructor',
        assistant_instructor_trainer: 'Assistant Instructor Trainer',
        instructor_trainer: 'Instructor Trainer',
        international_training_director: 'International Training Director',
      }
      return {
        title: name,
        subtitle: levels[level] || '',
        media,
      }
    },
  },
})
