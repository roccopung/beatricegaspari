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
      description: 'Short description of the website that will appear on Google',
      maxLength: 140,
      group: 'seo',
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      description: 'Image that will appear on Google',
      group: 'seo',
    }),
    defineField({
      name: 'favicon',
      title: 'favicon',
      type: 'image',
      description: 'Image that will appear in small, on each browser tab',
      group: 'seo',
    }),
  ],
})
