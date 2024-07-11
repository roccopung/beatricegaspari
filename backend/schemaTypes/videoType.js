import {defineField, defineType} from 'sanity'

export const videoType = defineType({
  name: 'video',
  type: 'object',
  fields: [
    defineField({
      name: 'videoLabel',
      type: 'string',
      description: 'OPTIONAL: didascalia del video',
    }),
    defineField({
      name: 'url',
      type: 'string',
      title: 'URL Embed',
      description: 'Vimeo: https://player.vimeo.com/video/[id], YouTube: https://www.youtube.com/embed/[id]',
    }),
  ],
})