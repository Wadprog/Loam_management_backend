// Initializes the `settings_history` service on path `/settings-history`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { SettingsHistory } from './settings_history.class'
import hooks from './settings_history.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'settings-history': SettingsHistory & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.SettingHistory,
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/settings-history', new SettingsHistory(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('settings-history')

  service.hooks(hooks)
}
