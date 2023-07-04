// Initializes the `clients ` service on path `/clients`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { Clients } from './customers.class'
import hooks from './customers.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    customers: Clients & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const sequelize = app.get('sequelizeClient')
  const options = {
    Model: sequelize.models.customers,
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/customers', new Clients(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('customers')

  service.hooks(hooks)
}
