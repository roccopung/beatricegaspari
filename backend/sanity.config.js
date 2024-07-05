import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {presentationTool} from 'sanity/presentation'
import {vercelDeployTool} from 'sanity-plugin-vercel-deploy'

export const sanity_preview_url = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

export default defineConfig({
  name: 'default',
  title: 'beatricegaspari.com',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
    presentationTool({
      previewUrl: {
        origin:  sanity_preview_url ,
        previewMode: {
          enable: '/preview/enable',
          disable: '/preview/disable',
        },
      },
    }),
    vercelDeployTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
