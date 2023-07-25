// Initializes the `settings_tenant` service on path `/settings-tenant`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { SettingsTenant } from './settings_tenant.class'
import hooks from './settings_tenant.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'settings-tenant': SettingsTenant & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.SettingsTenant,
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/settings-tenant', new SettingsTenant(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('settings-tenant')

  service.hooks(hooks)
}
