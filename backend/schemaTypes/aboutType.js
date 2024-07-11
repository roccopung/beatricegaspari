import {defineField, defineType, defineArrayMember} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const aboutType = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    {name: 'about', title: 'About'},
    {name: 'contacts', title: 'Contacts'},
  ],
  fields: [
    defineField({
      name: 'aboutDescription',
      type: 'array',
      title: 'About Description',
      of: [
        {
          type: 'block',
        },
      ],
    }),
    defineField({
      name: 'contacts',
      type: 'array',
      title: 'Contacts',
      group: 'contacts',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'contact',
          fields: [
            {
              type: 'string',
              name: 'type',
              title: 'Contact Type',
              description: 'Type of contact (Email, Phone, etc.)',
            },

            {
              type: 'string',
              name: 'label',
              title: 'Label',
              description: 'How you want to display the contact (i.e. @nickname for Instagram)',
            },
            {
              type: 'string',
              name: 'value',
              title: 'Value (e.g. beatricegaspari@gmail.com)',
              description: 'Url address, phone number, mail address etc.',
            },
          ],
        }),
      ],
    }),
  ],
})
