// Initializes the `medias` service on path `/medias`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { Medias } from './medias.class'
import hooks from './medias.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    medias: Medias & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate'),
    Model: app.get('sequelizeClient').models.Medias
  }

  // Initialize our service with any options it requires
  app.use('/medias', new Medias(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('medias')

  service.hooks(hooks)
}
