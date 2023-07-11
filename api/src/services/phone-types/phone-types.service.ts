// Initializes the `phoneTypes` service on path `/phone-types`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { PhoneTypes } from './phone-types.class'
import hooks from './phone-types.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'phone-types': PhoneTypes & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.PhoneTypes,
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/phone-types', new PhoneTypes(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('phone-types')

  service.hooks(hooks)
}
