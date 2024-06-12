import {defineField, defineType} from 'sanity'

import {CogIcon} from '@sanity/icons'

export const settingsType = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  groups: [{name: 'seo', title: 'SEO'}],
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site title',
      type: 'string',
      initialValue: 'Beatrice Gaspari',
      group: 'seo',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'string',
      maxLength: 140,
      group: 'seo',
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      group: 'seo',
    }),
    defineField({
      name: 'favicon',
      title: 'favicon',
      type: 'image',
      group: 'seo',
    }),
  ],
})
