/**
 * CAROUSEL SLIDE
 * Full content management for individual carousel slides
 * User can edit everything: images, text, buttons, etc.
 */
export default {
    name: 'carouselSlide',
    title: 'Carousel Slide',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Internal Title',
            type: 'string',
            description: 'For internal reference only (not displayed on site)',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'active',
            title: 'Active',
            type: 'boolean',
            description: 'Should this slide be displayed?',
            initialValue: true,
        },
        {
            name: 'displayOrder',
            title: 'Display Order',
            type: 'number',
            description: 'Order in which this slide appears (lower numbers first)',
            validation: (Rule) => Rule.required().min(0),
        },
        {
            name: 'mediaType',
            title: 'Background Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Image', value: 'image' },
                    { title: 'Video', value: 'video' },
                ],
                layout: 'radio',
            },
            initialValue: 'image',
        },
        {
            name: 'backgroundImage',
            title: 'Background Image',
            type: 'image',
            description: 'Upload a background image for this slide',
            hidden: ({ document }) => (document === null || document === void 0 ? void 0 : document.mediaType) === 'video',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'backgroundVideo',
            title: 'YouTube Video URL or ID',
            type: 'string',
            description: 'Enter YouTube video URL (e.g., https://youtube.com/watch?v=OdRoVA6Q8_o) or just the video ID',
            hidden: ({ document }) => (document === null || document === void 0 ? void 0 : document.mediaType) === 'image',
        },
        {
            name: 'videoStartTime',
            title: 'Video Start Time (seconds)',
            type: 'number',
            description: 'Start the video at a specific timestamp (in seconds)',
            hidden: ({ document }) => (document === null || document === void 0 ? void 0 : document.mediaType) === 'image',
            initialValue: 0,
        },
        {
            name: 'slideDuration',
            title: 'Slide Duration (milliseconds)',
            type: 'number',
            description: 'How long to display this slide before auto-advancing (e.g., 5000 = 5 seconds)',
            initialValue: 8000,
            validation: (Rule) => Rule.min(1000).max(30000),
        },
        {
            name: 'headline',
            title: 'Headline',
            type: 'string',
            description: 'Main heading text',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'subheadline',
            title: 'Subheadline',
            type: 'text',
            description: 'Supporting text below the headline',
            rows: 3,
        },
        {
            name: 'showButton',
            title: 'Show Button',
            type: 'boolean',
            description: 'Display call-to-action button(s)?',
            initialValue: true,
        },
        {
            name: 'buttonText',
            title: 'Primary Button Text',
            type: 'string',
            hidden: ({ document }) => !(document === null || document === void 0 ? void 0 : document.showButton),
        },
        {
            name: 'buttonLink',
            title: 'Primary Button Link',
            type: 'string',
            description: 'URL or path (e.g., /shop or https://example.com)',
            hidden: ({ document }) => !(document === null || document === void 0 ? void 0 : document.showButton),
        },
        {
            name: 'buttonStyle',
            title: 'Primary Button Style',
            type: 'string',
            options: {
                list: [
                    { title: 'Primary (Solid)', value: 'primary' },
                    { title: 'Secondary (Outline)', value: 'secondary' },
                ],
            },
            initialValue: 'primary',
            hidden: ({ document }) => !(document === null || document === void 0 ? void 0 : document.showButton),
        },
        {
            name: 'secondaryButtonText',
            title: 'Secondary Button Text',
            type: 'string',
            hidden: ({ document }) => !(document === null || document === void 0 ? void 0 : document.showButton),
        },
        {
            name: 'secondaryButtonLink',
            title: 'Secondary Button Link',
            type: 'string',
            hidden: ({ document }) => !(document === null || document === void 0 ? void 0 : document.showButton),
        },
        {
            name: 'secondaryButtonStyle',
            title: 'Secondary Button Style',
            type: 'string',
            options: {
                list: [
                    { title: 'Primary (Solid)', value: 'primary' },
                    { title: 'Secondary (Outline)', value: 'secondary' },
                ],
            },
            initialValue: 'secondary',
            hidden: ({ document }) => !(document === null || document === void 0 ? void 0 : document.showButton),
        },
        {
            name: 'textAlignment',
            title: 'Text Alignment',
            type: 'string',
            options: {
                list: [
                    { title: 'Left', value: 'left' },
                    { title: 'Center', value: 'center' },
                    { title: 'Right', value: 'right' },
                ],
                layout: 'radio',
            },
            initialValue: 'center',
        },
        {
            name: 'textColor',
            title: 'Text Color',
            type: 'string',
            options: {
                list: [
                    { title: 'White', value: 'white' },
                    { title: 'Dark', value: 'dark' },
                ],
                layout: 'radio',
            },
            initialValue: 'white',
        },
        {
            name: 'darkOverlay',
            title: 'Dark Overlay Opacity',
            type: 'number',
            description: 'Opacity of dark overlay (0-100)',
            validation: (Rule) => Rule.min(0).max(100),
            initialValue: 40,
        },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'headline',
            media: 'backgroundImage',
            active: 'active',
            order: 'displayOrder',
        },
        prepare(selection) {
            const { title, subtitle, media, active, order } = selection;
            return {
                title: `${order}. ${title}`,
                subtitle: `${subtitle} ${active ? '✓' : '(Inactive)'}`,
                media,
            };
        },
    },
};
