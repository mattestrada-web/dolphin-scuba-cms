import {defineField, defineType} from 'sanity'

/**
 * SWIM LESSON REFERENCE
 * Swim lesson programs synced from ERP
 * Allows visual selection in Sanity, but ERP remains source of truth
 */

export default defineType({
  name: 'swimLessonReference',
  title: 'Swim Lesson Reference',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'lessonId',
      title: 'Lesson ID',
      type: 'string',
      description: 'Unique lesson ID from ERP',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'lessonName',
      title: 'Lesson Name',
      type: 'string',
      description: 'e.g., "Adult Beginner", "Youth Advanced"',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'ageGroup',
      title: 'Age Group',
      type: 'string',
      options: {
        list: [
          {title: 'Infant (6mo-3yr)', value: 'infant'},
          {title: 'Preschool (3-5yr)', value: 'preschool'},
          {title: 'Youth (6-12yr)', value: 'youth'},
          {title: 'Teen (13-17yr)', value: 'teen'},
          {title: 'Adult (18+)', value: 'adult'},
          {title: 'All Ages', value: 'all'},
        ],
      },
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
          {title: 'Stroke Technique', value: 'technique'},
          {title: 'Water Safety', value: 'safety'},
        ],
      },
    }),

    defineField({
      name: 'thumbnail',
      title: 'Lesson Image',
      type: 'image',
      description: 'Representative image for this lesson',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      description: 'Brief lesson description',
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),

    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "4 Weeks", "8 Sessions"',
    }),

    defineField({
      name: 'basePrice',
      title: 'Starting Price (Reference)',
      type: 'number',
      description: 'For display only - real pricing from ERP',
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: 'nextSessionDate',
      title: 'Next Session Date',
      type: 'date',
      description: 'Reference only - real schedule from ERP',
    }),

    defineField({
      name: 'availableSeats',
      title: 'Available Seats',
      type: 'number',
      description: 'Reference only - real availability from ERP',
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: 'featured',
      title: 'Featured Lesson',
      type: 'boolean',
      description: 'Highlight as a featured lesson',
      initialValue: false,
    }),

    defineField({
      name: 'lastSyncedAt',
      title: 'Last Synced',
      type: 'datetime',
      readOnly: true,
    }),
  ],

  preview: {
    select: {
      title: 'lessonName',
      age: 'ageGroup',
      level: 'skillLevel',
      media: 'thumbnail',
      featured: 'featured',
    },
    prepare({title, age, level, media, featured}: any) {
      return {
        title,
        subtitle: `${age || 'N/A'} - ${level || 'N/A'} ${featured ? '⭐' : ''}`,
        media,
      }
    },
  },
}, {strict: false})
