// Initializes the `rolesTenant` service on path `/roles-tenant`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { RolesTenant } from './roles-tenant.class'
import hooks from './roles-tenant.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'roles-tenant': RolesTenant & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.RolesTenant,
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/roles-tenant', new RolesTenant(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('roles-tenant')

  service.hooks(hooks)
}
