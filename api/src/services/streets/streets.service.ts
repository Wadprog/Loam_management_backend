// Initializes the `streets` service on path `/streets`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { Streets } from './streets.class'
import createModel from '../../models/streets.model'
import hooks from './streets.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    streets: Streets & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.Streets,
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/streets', new Streets(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('streets')

  service.hooks(hooks)
}
