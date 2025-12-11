import {defineConfig} from 'sanity'
import {LogoIcon} from '../components/LogoIcon'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from '../sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Here* marketing site',
  basePath: '/',
  projectId: '81mbvj3d',
  dataset: 'playlists',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
