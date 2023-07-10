// Initializes the `permitions` service on path `/permitions`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { Authorization } from './authorizations.class'
import hooks from './authorizations.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    authorizations: Authorization & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.Authorizations,
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/authorizations', new Authorization(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('authorizations')

  service.hooks(hooks)
}
