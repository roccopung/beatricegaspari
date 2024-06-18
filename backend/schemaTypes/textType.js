import {defineType, defineField} from 'sanity'

export const textType = defineType({
  name: 'textType',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'TextBlock',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image'
        }
      ],
    }),
  ],
})
