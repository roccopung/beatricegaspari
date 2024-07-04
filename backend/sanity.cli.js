import * as dotenv from 'dotenv'
import {defineCliConfig} from 'sanity/cli'

dotenv.config()

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET

export default defineCliConfig({api: {projectId, dataset}})
