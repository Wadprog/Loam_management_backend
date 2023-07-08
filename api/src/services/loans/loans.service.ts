// Initializes the `loans` service on path `/loans`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { Loans } from './loans.class'

import hooks from './loans.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    loans: Loans & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const { models } = app.get('sequelizeClient')
  const options = {
    Model: models.Loans,
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/loans', new Loans(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('loans')

  service.hooks(hooks)
}
