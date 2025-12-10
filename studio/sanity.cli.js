import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '81mbvj3d',
    dataset: 'playlists',
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
  },
})
