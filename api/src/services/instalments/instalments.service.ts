// Initializes the `instalments` service on path `/instalments`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { Instalments } from './instalments.class'
import hooks from './instalments.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    instalments: Instalments & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.Instalments,
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/instalments', new Instalments(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('instalments')

  service.hooks(hooks)
}
