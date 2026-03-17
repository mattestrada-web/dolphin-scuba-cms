import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * HOMEPAGE CONFIGURATION
 * Central hub for managing all homepage content
 * Users configure carousel slides and select featured items here
 */

export default defineType({
  name: 'homepage',
  title: 'Homepage Configuration',
  type: 'document',
  // Only allow one homepage config document
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'For your reference only (e.g., "Main Homepage")',
      validation: (Rule) => Rule.required(),
    }),

    // CAROUSEL SLIDES SECTION
    defineField({
      name: 'carouselSlides',
      title: '🎠 Carousel Slides',
      type: 'array',
      description: 'Manage all carousel slides - drag to reorder',
      of: [defineArrayMember({type: 'reference', to: [{type: 'carouselSlide'}]})],
      validation: (Rule) => Rule.max(12).warning('Recommended maximum is 12 slides'),
    }),

    // FEATURED PRODUCTS SECTION
    defineField({
      name: 'featuredProducts',
      title: '⭐ Featured Products',
      type: 'array',
      description: 'Select from the Products catalog (Site → Products)',
      of: [defineArrayMember({type: 'reference', to: [{type: 'product'}]})],
      validation: (Rule) => Rule.max(8).warning('Recommended maximum is 8 products'),
    }),

    // FEATURED TRIPS SECTION
    defineField({
      name: 'featuredTrips',
      title: '✈️ Featured Trips',
      type: 'array',
      description: 'Select from Travel → Trips (canonical trip intelligence)',
      of: [defineArrayMember({type: 'reference', to: [{type: 'trip'}]})],
      validation: (Rule) => Rule.max(6).warning('Recommended maximum is 6 trips'),
    }),

    // FEATURED SCUBA CLASSES SECTION
    defineField({
      name: 'featuredScubaClasses',
      title: '🤿 Featured Scuba Classes',
      type: 'array',
      description: 'Select from Site → Featured content → Scuba Class References (until full Classes type exists)',
      of: [defineArrayMember({type: 'reference', to: [{type: 'scubaClassReference'}]})],
      validation: (Rule) => Rule.max(4).warning('Recommended maximum is 4 classes'),
    }),

    // FEATURED SWIM LESSONS SECTION
    defineField({
      name: 'featuredSwimLessons',
      title: '🏊 Featured Swim Lessons',
      type: 'array',
      description: 'Select from Site → Featured content → Swim Lesson References (until full Swim type exists)',
      of: [defineArrayMember({type: 'reference', to: [{type: 'swimLessonReference'}]})],
      validation: (Rule) => Rule.max(4).warning('Recommended maximum is 4 lessons'),
    }),

    // LAST UPDATED
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      readOnly: true,
      hidden: true,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      slideCount: 'carouselSlides.length',
      productCount: 'featuredProducts.length',
    },
    prepare({title, slideCount, productCount}: any) {
      return {
        title: title || 'Homepage',
        subtitle: `${slideCount || 0} slides, ${productCount || 0} featured products`,
      }
    },
  },
}, {strict: false})
