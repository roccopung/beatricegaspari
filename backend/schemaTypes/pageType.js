import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const pageType = defineType({
    name: 'page',
    title: 'Page',
    type: 'document',
    icon: DocumentIcon,
    fields: [
      defineField({
        name: 'title',
        type: 'string',
      }),
      defineField({
        name: 'description',
        type: 'array',
        title: 'Content',
        of: [
          {
            type: 'block',
          },
        ],
      }),
    ],
  })
  