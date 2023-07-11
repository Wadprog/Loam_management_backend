// Initializes the `addressesUser` service on path `/addresses-user`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { AddressesUser } from './addresses-user.class'
import hooks from './addresses-user.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'addresses-user': AddressesUser & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.AddressesUser,
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/addresses-user', new AddressesUser(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('addresses-user')

  service.hooks(hooks)
}
