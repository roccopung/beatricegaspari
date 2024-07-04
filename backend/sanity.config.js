import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {presentationTool} from 'sanity/presentation'
import {vercelDeployTool} from 'sanity-plugin-vercel-deploy'

const SANITY_STUDIO_PREVIEW_URL = (
	process.env.SANITY_STUDIO_PREVIEW_URL
	|| 'http://localhost:3000'
)

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
        previewUrl: SANITY_STUDIO_PREVIEW_URL,
      },
    }),
    vercelDeployTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
