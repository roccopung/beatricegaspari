import {defineType, defineField} from 'sanity'

export const textType = defineType({
  name: 'textType',
  title: 'Text Editor',
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
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'}
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External link',
                fields: [
                  {
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                  },
                  {
                    title: 'Open in new tab',
                    name: 'blank',
                    type: 'boolean',
                  },
                ],
              },
              {
                name: 'internalLink',
                type: 'object',
                title: 'Internal link',
                fields: [
                  {
                    name: 'item',
                    type: 'reference',
                    title: 'Reference',
                    to: [{type: 'project'}],
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image'
        }
      ],
    }),
  ],
})
