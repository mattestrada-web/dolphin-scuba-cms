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
      name: 'explorerThumbnail',
      title: 'Explorer Thumbnail',
      type: 'url',
      description: 'Alternate thumbnail image for Explorer (EX) designated schedules',
    }),

    defineField({
      name: 'program',
      title: 'Program',
      type: 'string',
      description: 'SSI program category (e.g. Diving Program, Ecology Program)',
      options: {
        list: [
          {title: 'Diving Program', value: 'Diving Program'},
          {title: 'Ecology Program', value: 'Ecology Program'},
          {title: 'Freediving Program', value: 'Freediving Program'},
          {title: 'Mermaid Program', value: 'Mermaid Program'},
          {title: 'Explorers Program', value: 'Explorers Program'},
          {title: 'Swim Program', value: 'Swim Program'},
          {title: 'Swim Teacher Program', value: 'Swim Teacher Program'},
          {title: 'Snorkel Program', value: 'Snorkel Program'},
          {title: 'React Right Program', value: 'React Right Program'},
          {title: 'Rebreather Diver Program', value: 'Rebreather Diver Program'},
          {title: 'Lifeguard Program', value: 'Lifeguard Program'},
          {title: 'Lifeguard Leader Program', value: 'Lifeguard Leader Program'},
          {title: 'Classified Diver Program', value: 'Classified Diver Program'},
          {title: 'XR/TXR Program', value: 'XR/TXR Program'},
        ],
      },
    }),

    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Highlight this class in the featured hero section',
      initialValue: false,
    }),

    defineField({
      name: 'professionalEligible',
      title: 'Specialty Instructor Eligible',
      type: 'boolean',
      description: 'Can certify Specialty Instructors — cross-listed under Professional Program',
      initialValue: false,
    }),

    defineField({
      name: 'ssiCourseUid',
      title: 'SSI Course UID',
      type: 'string',
      description: 'SSI digital course ID (e.g. "12378") — links eLearning progress',
      readOnly: true,
    }),

    defineField({
      name: 'ssiShortCode',
      title: 'SSI Short Code',
      type: 'string',
      description: 'SSI course short code (e.g. "SC-SHA", "OWD")',
      readOnly: true,
    }),

    defineField({
      name: 'ssiSku',
      title: 'SSI SKU',
      type: 'string',
      description: 'SSI product SKU (e.g. "93700718")',
      readOnly: true,
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
      name: 'promotedOnBigCommerce',
      title: 'Promoted on Big Commerce',
      type: 'boolean',
      initialValue: false,
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
      name: 'digitalMaterials',
      title: 'Digital Materials',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'product'}]}],
      description: 'SSI Digital Kits that students should purchase for this class',
    }),

    defineField({
      name: 'policies',
      title: 'Policies',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'scubaPolicy'}]}],
      description: 'Link relevant policies that apply to this class',
    }),

    defineField({
      name: 'classCodePrefix',
      title: 'Class Code Prefix',
      type: 'string',
      description: 'Two-letter prefix for auto-generating class codes (e.g. OW, AA)',
      validation: (Rule) => Rule.max(8),
    }),

    defineField({
      name: 'defaultPrice',
      title: 'Default Price',
      type: 'number',
      description: 'Default price in cents (e.g. 39900 = $399.00)',
    }),

    defineField({
      name: 'maxStudents',
      title: 'Max Students',
      type: 'number',
      description: 'Default maximum students per schedule',
      validation: (Rule) => Rule.min(1),
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
