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
      description: 'Select products and optionally customize how they appear on the homepage.',
      of: [defineArrayMember({type: 'featuredProductItem'})],
      validation: (Rule) => Rule.max(20).warning('Recommended maximum is 20 products'),
    }),

    defineField({
      name: 'featuredCategories',
      title: '🗂️ Featured Categories',
      type: 'array',
      description: 'Select the categories to feature on the homepage in display order.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'category'}]})],
      validation: (Rule) => Rule.max(8).warning('Recommended maximum is 8 categories'),
    }),

    // SHOP BY BRAND SECTION
    defineField({
      name: 'shopByBrands',
      title: '🏷️ Shop by Brand',
      type: 'array',
      description:
        'Brand logos for the Shop by Brand section. Existing entries can stay as simple brand references, or use Brand Card items for homepage-specific presentation controls.',
      of: [
        defineArrayMember({type: 'reference', to: [{type: 'brand'}]}),
        defineArrayMember({
          name: 'homepageBrandCard',
          title: 'Brand Card',
          type: 'object',
          fields: [
            defineField({
              name: 'brand',
              title: 'Brand',
              type: 'reference',
              to: [{type: 'brand'}],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'logoScale',
              title: 'Logo Size',
              type: 'number',
              description:
                'How much of the frame the logo fills (0.5–1). Use less than 1 if the logo feels too tight or visually dominant.',
              initialValue: 1,
              validation: (Rule) => Rule.min(0.5).max(1),
            }),
            defineField({
              name: 'logoBackground',
              title: 'Logo Background',
              type: 'string',
              description: 'Background treatment for this homepage card only.',
              initialValue: 'white',
              options: {
                list: [
                  {title: 'White', value: 'white'},
                  {title: 'Transparent', value: 'transparent'},
                  {title: 'Gray', value: 'gray'},
                ],
                layout: 'radio',
              },
            }),
          ],
            preview: {
            select: {
              title: 'brand.name',
              media: 'brand.logo',
              scale: 'logoScale',
              background: 'logoBackground',
            },
            prepare({title, media, scale, background}: any) {
              const details = [
                scale && scale !== 1 ? `size ${scale}` : null,
                background && background !== 'white' ? background : null,
              ]
                .filter(Boolean)
                .join(', ')

              return {
                title: title || 'Brand Card',
                subtitle: details || 'Default presentation',
                media,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.max(8).warning('Maximum 8 brands for this section'),
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
    defineField({
      name: 'travelExplorerItems',
      title: '🌍 Travel Explorer Items',
      type: 'array',
      description: 'Choose the geographic regions and travel themes featured in discovery surfaces.',
      of: [defineArrayMember({type: 'travelExplorerItem'})],
      validation: (Rule) => Rule.max(6).warning('Recommended maximum is 6 items'),
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
      categoryCount: 'featuredCategories.length',
      brandCount: 'shopByBrands.length',
    },
    prepare({title, slideCount, productCount, categoryCount, brandCount}: any) {
      return {
        title: title || 'Homepage',
        subtitle: `${slideCount || 0} slides, ${productCount || 0} products, ${categoryCount || 0} categories, ${brandCount || 0} brands`,
      }
    },
  },
}, {strict: false})
