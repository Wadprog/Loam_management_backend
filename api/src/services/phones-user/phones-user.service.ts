// Initializes the `phonesUser` service on path `/phones-user`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { PhonesUser } from './phones-user.class'
import hooks from './phones-user.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'phones-user': PhonesUser & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.PhonesUser,
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/phones-user', new PhonesUser(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('phones-user')

  service.hooks(hooks)
}
