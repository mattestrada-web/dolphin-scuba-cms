import {defineField, defineType} from 'sanity'

/**
 * SPEC VALUE (embedded)
 * Links a product to a spec with a value. Store as string; coerce to boolean/number in frontend based on spec.type.
 */
export default defineType({
  name: 'specValue',
  title: 'Spec Value',
  type: 'object',
  fields: [
    defineField({
      name: 'spec',
      title: 'Spec',
      type: 'reference',
      to: [{type: 'spec'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'For boolean specs use "true" or "false"; for number use the number',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {spec: 'spec', value: 'value'},
    prepare({spec, value}) {
      const ref = spec as {_ref?: string} | undefined
      return {
        title: value ? `${ref?._ref ?? 'Spec'}: ${value}` : 'Spec value',
      }
    },
  },
})
