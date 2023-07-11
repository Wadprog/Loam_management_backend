// Initializes the `previousAddress` service on path `/previous-address`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { PreviousAddress } from './previous-address.class'
import hooks from './previous-address.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'previous-address': PreviousAddress & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.PreviousAddress,
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/previous-address', new PreviousAddress(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('previous-address')

  service.hooks(hooks)
}
