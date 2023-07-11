// Initializes the `settings ` service on path `/settings`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { Settings } from './settings.class'
import hooks from './settings.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    settings: Settings & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.Settings,
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/settings', new Settings(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('settings')

  service.hooks(hooks)
}
