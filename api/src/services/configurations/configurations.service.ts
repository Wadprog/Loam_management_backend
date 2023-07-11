// Initializes the `configurations` service on path `/configurations`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { Configurations } from './configurations.class'
import hooks from './configurations.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    configurations: Configurations & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.Configurations,
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/configurations', new Configurations(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('configurations')

  service.hooks(hooks)
}
