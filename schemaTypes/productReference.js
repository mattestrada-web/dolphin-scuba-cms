/**
 * PRODUCT REFERENCE
 * Lightweight product metadata synced from ERP
 * Allows visual selection in Sanity, but ERP remains source of truth
 * Sync this nightly or on-demand from your ERP
 */
export default {
    name: 'productReference',
    title: 'Product Reference',
    type: 'document',
    // Prevent manual creation - only sync from ERP
    __experimental_actions: ['update', 'publish'],
    fields: [
        {
            name: 'sku',
            title: 'SKU',
            type: 'string',
            description: 'Product SKU from ERP (unique identifier)',
            validation: Rule => Rule.required()
        },
        {
            name: 'erpId',
            title: 'ERP ID',
            type: 'string',
            description: 'Internal product ID from ERP system',
            validation: Rule => Rule.required()
        },
        {
            name: 'name',
            title: 'Product Name',
            type: 'string',
            description: 'Display name from ERP',
            validation: Rule => Rule.required()
        },
        {
            name: 'thumbnail',
            title: 'Thumbnail',
            type: 'image',
            description: 'Product thumbnail for visual selection',
            options: {
                hotspot: true
            }
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            description: 'Product category (e.g., Regulators, BCDs, Masks)'
        },
        {
            name: 'brand',
            title: 'Brand',
            type: 'string',
            description: 'Manufacturer/brand name'
        },
        {
            name: 'basePrice',
            title: 'Base Price (Reference)',
            type: 'number',
            description: 'For display purposes only - real-time price comes from ERP',
            validation: Rule => Rule.min(0)
        },
        {
            name: 'inStock',
            title: 'In Stock',
            type: 'boolean',
            description: 'Reference only - real inventory from ERP',
            initialValue: true
        },
        {
            name: 'lastSyncedAt',
            title: 'Last Synced',
            type: 'datetime',
            description: 'When this was last synced from ERP',
            readOnly: true
        }
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'sku',
            brand: 'brand',
            media: 'thumbnail',
            inStock: 'inStock'
        },
        prepare({ title, subtitle, brand, media, inStock }) {
            return {
                title: title,
                subtitle: `${subtitle} - ${brand || 'No brand'} ${inStock ? '✓' : '(Out of stock)'}`,
                media: media
            };
        }
    }
};
