import {defineField, defineType} from 'sanity'

export const imageType = defineType({
  name: 'image',
  type: 'object',
  title: 'Image with caption',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'excerpt',
      media: 'image',
    }
  }
})