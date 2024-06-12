import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {presentationTool} from 'sanity/presentation'

export default defineConfig({
  name: 'default',
  title: 'beatricegaspari.com',

  projectId: 'rg0ypv3u',
  dataset: 'production',

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
    presentationTool({
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000',
        previewMode: {
          enable: '/preview/enable',
          disable: '/preview/disable',
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
