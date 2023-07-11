// Initializes the `countries` service on path `/countries`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { Countries } from './countries.class'
import hooks from './countries.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    countries: Countries & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.Countries,
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/countries', new Countries(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('countries')

  service.hooks(hooks)
}
