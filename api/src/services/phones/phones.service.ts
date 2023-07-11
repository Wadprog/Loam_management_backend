// Initializes the `phones ` service on path `/phones`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { Phones } from './phones.class'
import hooks from './phones.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    phones: Phones & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.Phones,
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/phones', new Phones(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('phones')

  service.hooks(hooks)
}
