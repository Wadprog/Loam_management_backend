// Initializes the `alteredAddressNotification` service on path `/altered-address-notification`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { AlteredAddressNotification } from './altered-address-notification.class'
import hooks from './altered-address-notification.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'altered-address-notification': AlteredAddressNotification & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.AlteredAddressNotifications,
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/altered-address-notification', new AlteredAddressNotification(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('altered-address-notification')

  service.hooks(hooks)
}
