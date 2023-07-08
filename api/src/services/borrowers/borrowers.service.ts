// Initializes the `borrowers` service on path `/borrowers`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { Borrowers } from './borrowers.class'
import hooks from './borrowers.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    borrowers: Borrowers & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const { models } = app.get('sequelizeClient')
  const options = {
    Model: models.Borrowers,
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/borrowers', new Borrowers(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('borrowers')

  service.hooks(hooks)
}
