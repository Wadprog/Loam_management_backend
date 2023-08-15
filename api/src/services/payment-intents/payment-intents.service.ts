// Initializes the `payment_intents ` service on path `/payment-intents`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { PaymentIntents } from './payment-intents.class'
import hooks from './payment-intents.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'payment-intents': PaymentIntents & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.PaymentIntents,
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/payment-intents', new PaymentIntents(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('payment-intents')

  service.hooks(hooks)
}
