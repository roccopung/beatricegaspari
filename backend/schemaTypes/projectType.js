import {defineField, defineType, defineArrayMember} from 'sanity'
import {SparklesIcon} from '@sanity/icons'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    {name: 'details', title: 'Details'},
    {name: 'seo', title: 'SEO'},
  ],
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required().error('A slug is required.'),
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      group: 'details',
    }),
    defineField({
      name: 'year',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'client',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'technique',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
      group: 'details',
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
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'gallery',
    }),
    defineField({
      name: 'pageBuilder',
      type: 'array',
      title: 'Page builder',
      of: [
        defineArrayMember({
          name: 'gallery',
          type: 'gallery',
        }),
        defineArrayMember({
          name: 'image',
          type: 'image',
          fields: [
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
        }),
        defineArrayMember({
          name: 'video',
          type: 'video',
        }),
        defineArrayMember({
          name: 'textType',
          type: 'textType',
        }),
      ],
    }),
    {name: 'seoTitle', title: 'SEO title', type: 'string', group: 'seo'},
    {name: 'seoKeywords', title: 'Keywords', type: 'string', group: 'seo'},
    {name: 'seoImage', title: 'Image', type: 'image', group: 'seo'},
    {
      name: 'seoSlug',
      title: 'Slug',
      type: 'slug',
      group: 'seo',
      options: {
        source: 'title',
      },
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'string',
      maxLength: 140,
      group: 'seo',
    },
  ],
})
