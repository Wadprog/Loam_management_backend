// Initializes the `authorizationsroles` service on path `/authorizationsroles`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { Authorizationsroles } from './authorizationsroles.class'
import hooks from './authorizationsroles.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    authorizationsroles: Authorizationsroles & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.AuthorizationsRole,
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/authorizationsroles', new Authorizationsroles(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('authorizationsroles')

  service.hooks(hooks)
}
