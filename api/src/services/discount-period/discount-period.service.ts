// Initializes the `discount_period ` service on path `/discount-period`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { DiscountPeriod } from './discount-period.class'
import hooks from './discount-period.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'discount-period': DiscountPeriod & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.DiscountPeriods,
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/discount-period', new DiscountPeriod(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('discount-period')

  service.hooks(hooks)
}
