import {defineField, defineType} from 'sanity'

/**
 * CAROUSEL SLIDE
 * Full content management for individual carousel slides
 * User can edit everything: images, text, buttons, etc.
 */

export default defineType({
  name: 'carouselSlide',
  title: 'Carousel Slide',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'For internal reference only (not displayed on site)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Should this slide be displayed?',
      initialValue: true,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this slide appears (lower numbers first)',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'mediaType',
      title: 'Background Type',
      type: 'string',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
        ],
        layout: 'radio',
      },
      initialValue: 'image',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      description: 'Upload a background image for this slide',
      hidden: ({document}: any) => document?.mediaType === 'video',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'backgroundVideo',
      title: 'YouTube Video URL or ID',
      type: 'string',
      description: 'Enter YouTube video URL (e.g., https://youtube.com/watch?v=OdRoVA6Q8_o) or just the video ID',
      hidden: ({document}: any) => document?.mediaType === 'image',
    }),
    defineField({
      name: 'videoStartTime',
      title: 'Video Start Time (seconds)',
      type: 'number',
      description: 'Start the video at a specific timestamp (in seconds)',
      hidden: ({document}: any) => document?.mediaType === 'image',
      initialValue: 0,
    }),
    defineField({
      name: 'slideDuration',
      title: 'Slide Duration (milliseconds)',
      type: 'number',
      description: 'How long to display this slide before auto-advancing (e.g., 5000 = 5 seconds)',
      initialValue: 8000,
      validation: (Rule) => Rule.min(1000).max(30000),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Main heading text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      description: 'Supporting text below the headline',
      rows: 3,
    }),
    defineField({
      name: 'showButton',
      title: 'Show Button',
      type: 'boolean',
      description: 'Display call-to-action button(s)?',
      initialValue: true,
    }),
    defineField({
      name: 'buttonText',
      title: 'Primary Button Text',
      type: 'string',
      hidden: ({document}: any) => !document?.showButton,
    }),
    defineField({
      name: 'buttonLink',
      title: 'Primary Button Link',
      type: 'string',
      description: 'URL or path (e.g., /shop or https://example.com)',
      hidden: ({document}: any) => !document?.showButton,
    }),
    defineField({
      name: 'buttonStyle',
      title: 'Primary Button Style',
      type: 'string',
      options: {
        list: [
          {title: 'Primary (Solid)', value: 'primary'},
          {title: 'Secondary (Outline)', value: 'secondary'},
        ],
      },
      initialValue: 'primary',
      hidden: ({document}: any) => !document?.showButton,
    }),
    defineField({
      name: 'secondaryButtonText',
      title: 'Secondary Button Text',
      type: 'string',
      hidden: ({document}: any) => !document?.showButton,
    }),
    defineField({
      name: 'secondaryButtonLink',
      title: 'Secondary Button Link',
      type: 'string',
      hidden: ({document}: any) => !document?.showButton,
    }),
    defineField({
      name: 'secondaryButtonStyle',
      title: 'Secondary Button Style',
      type: 'string',
      options: {
        list: [
          {title: 'Primary (Solid)', value: 'primary'},
          {title: 'Secondary (Outline)', value: 'secondary'},
        ],
      },
      initialValue: 'secondary',
      hidden: ({document}: any) => !document?.showButton,
    }),
    defineField({
      name: 'textAlignment',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
      initialValue: 'center',
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      options: {
        list: [
          {title: 'White', value: 'white'},
          {title: 'Dark', value: 'dark'},
        ],
        layout: 'radio',
      },
      initialValue: 'white',
    }),
    defineField({
      name: 'darkOverlay',
      title: 'Dark Overlay Opacity',
      type: 'number',
      description: 'Opacity of dark overlay (0-100)',
      validation: (Rule) => Rule.min(0).max(100),
      initialValue: 40,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'headline',
      media: 'backgroundImage',
      active: 'active',
      order: 'displayOrder',
    },
    prepare({title, subtitle, media, active, order}: any) {
      return {
        title: `${order}. ${title}`,
        subtitle: `${subtitle} ${active ? '✓' : '(Inactive)'}`,
        media,
      }
    },
  },
}, {strict: false})
