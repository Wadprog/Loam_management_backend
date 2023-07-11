// Initializes the `documents` service on path `/documents`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { Contracts } from './contracts.class'
import hooks from './contracts.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    contracts: Contracts & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.Contracts,
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/contracts', new Contracts(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('contracts')

  service.hooks(hooks)
}
