import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'scubaClass',
  title: 'Scuba Class',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g., "Open Water Diver", "Advanced Adventurer"',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "3 Days", "2 Weekends", "4–6 Hours"',
    }),

    defineField({
      name: 'minimumAge',
      title: 'Minimum Age',
      type: 'number',
      description: 'Minimum age in years',
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Full class description (rich text)',
    }),

    defineField({
      name: 'teaser',
      title: 'Teaser',
      type: 'text',
      description: 'Short summary for cards and previews',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),

    defineField({
      name: 'ssiThumbnail',
      title: 'SSI Thumbnail',
      type: 'url',
      description: 'URL to SSI certification card or class image',
    }),

    defineField({
      name: 'skillLevel',
      title: 'Skill Level',
      type: 'string',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'},
          {title: 'Professional', value: 'professional'},
        ],
      },
    }),

    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Prerequisites and requirements (rich text)',
    }),

    defineField({
      name: 'rstcMedicalFormRequired',
      title: 'RSTC Medical Form Required',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'rstcMedicalFormLink',
      title: 'RSTC Medical Form Link',
      type: 'url',
      description: 'URL to the RSTC medical form (shown when required)',
      hidden: ({parent}) => !parent?.rstcMedicalFormRequired,
    }),

    defineField({
      name: 'ssiVideoLink',
      title: 'SSI Video Link',
      type: 'url',
      description: 'Link to SSI promotional or instructional video',
    }),

    defineField({
      name: 'whatToBring',
      title: 'What to Bring',
      type: 'array',
      of: [{type: 'block'}],
      description: 'What students should bring to class (rich text)',
    }),

    defineField({
      name: 'policies',
      title: 'Policies',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'scubaPolicy'}]}],
      description: 'Link relevant policies that apply to this class',
    }),

    defineField({
      name: 'sawyerWidgetEmbed',
      title: 'Sawyer Widget Embed Code',
      type: 'text',
      description: 'Paste the Sawyer booking widget embed code (HTML/script)',
      rows: 5,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      level: 'skillLevel',
    },
    prepare({title, level}: any) {
      const levels: Record<string, string> = {
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        advanced: 'Advanced',
        professional: 'Professional',
      }
      return {
        title,
        subtitle: levels[level] || '',
      }
    },
  },
})
