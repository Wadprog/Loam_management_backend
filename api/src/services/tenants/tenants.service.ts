// Initializes the `addresses` service on path `/addresses`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { Tenants } from './tenants.class'

import hooks from './tenants.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    tenants: Tenants & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.Tenants,
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/tenants', new Tenants(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('tenants')

  service.hooks(hooks)
}
