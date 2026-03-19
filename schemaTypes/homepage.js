/**
 * HOMEPAGE CONFIGURATION
 * Central hub for managing all homepage content
 * Users configure carousel slides and select featured items here
 */
export default {
    name: 'homepage',
    title: 'Homepage Configuration',
    type: 'document',
    // Only allow one homepage config document
    __experimental_actions: ['update', 'publish'],
    fields: [
        {
            name: 'title',
            title: 'Internal Title',
            type: 'string',
            description: 'For your reference only (e.g., "Main Homepage")',
            validation: Rule => Rule.required()
        },
        // CAROUSEL SLIDES SECTION
        {
            name: 'carouselSlides',
            title: '🎠 Carousel Slides',
            type: 'array',
            description: 'Manage all carousel slides - drag to reorder',
            of: [{ type: 'reference', to: [{ type: 'carouselSlide' }] }],
            validation: Rule => Rule.max(12).warning('Recommended maximum is 12 slides')
        },
        // FEATURED PRODUCTS SECTION
        {
            name: 'featuredProducts',
            title: '⭐ Featured Products',
            type: 'array',
            description: 'Select products to feature on homepage (data pulled from ERP)',
            of: [{ type: 'reference', to: [{ type: 'productReference' }] }],
            validation: Rule => Rule.max(8).warning('Recommended maximum is 8 products')
        },
        // SHOP BY BRAND SECTION
        {
            name: 'shopByBrands',
            title: '🏷️ Shop by Brand',
            type: 'array',
            description: 'Brand logos for the Shop by Brand section. Existing entries can stay as simple brand references, or use Brand Card items for homepage-specific presentation controls.',
            of: [
                { type: 'reference', to: [{ type: 'brand' }] },
                {
                    name: 'homepageBrandCard',
                    title: 'Brand Card',
                    type: 'object',
                    fields: [
                        {
                            name: 'brand',
                            title: 'Brand',
                            type: 'reference',
                            to: [{ type: 'brand' }],
                            validation: Rule => Rule.required()
                        },
                        {
                            name: 'logoScale',
                            title: 'Logo Size',
                            type: 'number',
                            description: 'How much of the frame the logo fills (0.5–1). Use less than 1 if the logo feels too tight or visually dominant.',
                            initialValue: 1,
                            validation: Rule => Rule.min(0.5).max(1)
                        },
                        {
                            name: 'logoBackground',
                            title: 'Logo Background',
                            type: 'string',
                            description: 'Background treatment for this homepage card only.',
                            initialValue: 'white',
                            options: {
                                list: [
                                    { title: 'White', value: 'white' },
                                    { title: 'Transparent', value: 'transparent' },
                                    { title: 'Gray', value: 'gray' }
                                ],
                                layout: 'radio'
                            }
                        }
                    ],
                    preview: {
                        select: {
                            title: 'brand.name',
                            media: 'brand.logo',
                            scale: 'logoScale',
                            background: 'logoBackground'
                        },
                        prepare({ title, media, scale, background }) {
                            const details = [
                                scale && scale !== 1 ? `size ${scale}` : null,
                                background && background !== 'white' ? background : null
                            ].filter(Boolean).join(', ');
                            return {
                                title: title || 'Brand Card',
                                subtitle: details || 'Default presentation',
                                media
                            };
                        }
                    }
                }
            ],
            validation: Rule => Rule.max(8).warning('Maximum 8 brands for this section')
        },
        // FEATURED TRIPS SECTION
        {
            name: 'featuredTrips',
            title: '✈️ Featured Trips',
            type: 'array',
            description: 'Select dive trips to feature (data pulled from ERP)',
            of: [{ type: 'reference', to: [{ type: 'tripReference' }] }],
            validation: Rule => Rule.max(6).warning('Recommended maximum is 6 trips')
        },
        // FEATURED SCUBA CLASSES SECTION
        {
            name: 'featuredScubaClasses',
            title: '🤿 Featured Scuba Classes',
            type: 'array',
            description: 'Select SSI scuba classes to feature (data pulled from ERP)',
            of: [{ type: 'reference', to: [{ type: 'scubaClassReference' }] }],
            validation: Rule => Rule.max(4).warning('Recommended maximum is 4 classes')
        },
        // FEATURED SWIM LESSONS SECTION
        {
            name: 'featuredSwimLessons',
            title: '🏊 Featured Swim Lessons',
            type: 'array',
            description: 'Select swim lessons to feature (data pulled from ERP)',
            of: [{ type: 'reference', to: [{ type: 'swimLessonReference' }] }],
            validation: Rule => Rule.max(4).warning('Recommended maximum is 4 lessons')
        },
        // LAST UPDATED
        {
            name: 'lastUpdated',
            title: 'Last Updated',
            type: 'datetime',
            readOnly: true,
            hidden: true
        }
    ],
    preview: {
        select: {
            title: 'title',
            slideCount: 'carouselSlides',
            productCount: 'featuredProducts',
            brandCount: 'shopByBrands'
        },
        prepare({ title, slideCount, productCount, brandCount }) {
            return {
                title: title || 'Homepage',
                subtitle: `${(slideCount?.length) || 0} slides, ${(productCount?.length) || 0} products, ${(brandCount?.length) || 0} brands`
            };
        }
    }
};
