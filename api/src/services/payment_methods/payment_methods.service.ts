// Initializes the `payment_methods` service on path `/payment-methods`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { PaymentMethods } from './payment_methods.class'
import hooks from './payment_methods.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'payment-methods': PaymentMethods & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.PaymentMethods,
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/payment-methods', new PaymentMethods(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('payment-methods')

  service.hooks(hooks)
}
