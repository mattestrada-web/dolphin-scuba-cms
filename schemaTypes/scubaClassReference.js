/**
 * SCUBA CLASS REFERENCE
 * SSI scuba certification classes synced from ERP
 * Allows visual selection in Sanity, but ERP remains source of truth
 */
export default {
    name: 'scubaClassReference',
    title: 'Scuba Class Reference',
    type: 'document',
    __experimental_actions: ['update', 'publish'],
    fields: [
        {
            name: 'classId',
            title: 'Class ID',
            type: 'string',
            description: 'Unique class ID from ERP',
            validation: Rule => Rule.required()
        },
        {
            name: 'className',
            title: 'Class Name',
            type: 'string',
            description: 'e.g., "Open Water Diver", "Advanced Open Water"',
            validation: Rule => Rule.required()
        },
        {
            name: 'certificationLevel',
            title: 'SSI Certification Level',
            type: 'string',
            options: {
                list: [
                    { title: 'Open Water Diver', value: 'open-water' },
                    { title: 'Advanced Open Water', value: 'advanced' },
                    { title: 'Stress and Rescue', value: 'rescue' },
                    { title: 'Divemaster', value: 'divemaster' },
                    { title: 'Specialty Course', value: 'specialty' },
                    { title: 'Other', value: 'other' }
                ]
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'thumbnail',
            title: 'Class Image',
            type: 'image',
            description: 'Representative image for this class',
            options: {
                hotspot: true
            }
        },
        {
            name: 'shortDescription',
            title: 'Short Description',
            type: 'text',
            description: 'Brief class description',
            rows: 3,
            validation: Rule => Rule.max(200)
        },
        {
            name: 'duration',
            title: 'Duration',
            type: 'string',
            description: 'e.g., "3 Days", "2 Weekends"'
        },
        {
            name: 'basePrice',
            title: 'Starting Price (Reference)',
            type: 'number',
            description: 'For display only - real pricing from ERP',
            validation: Rule => Rule.min(0)
        },
        {
            name: 'nextSessionDate',
            title: 'Next Session Date',
            type: 'date',
            description: 'Reference only - real schedule from ERP'
        },
        {
            name: 'availableSeats',
            title: 'Available Seats',
            type: 'number',
            description: 'Reference only - real availability from ERP',
            validation: Rule => Rule.min(0)
        },
        {
            name: 'prerequisites',
            title: 'Prerequisites',
            type: 'string',
            description: 'e.g., "Open Water Diver certification required"'
        },
        {
            name: 'featured',
            title: 'Featured Class',
            type: 'boolean',
            description: 'Highlight as a featured class',
            initialValue: false
        },
        {
            name: 'lastSyncedAt',
            title: 'Last Synced',
            type: 'datetime',
            readOnly: true
        }
    ],
    preview: {
        select: {
            title: 'className',
            level: 'certificationLevel',
            nextSession: 'nextSessionDate',
            media: 'thumbnail',
            featured: 'featured'
        },
        prepare({ title, level, nextSession, media, featured }) {
            return {
                title: title,
                subtitle: `SSI ${level || 'N/A'} ${featured ? '⭐' : ''}`,
                media: media
            };
        }
    }
};
