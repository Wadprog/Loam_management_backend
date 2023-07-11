// Initializes the `addressBorrower` service on path `/address-borrower`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { AddressBorrower } from './address-borrower.class'
import hooks from './address-borrower.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'address-borrower': AddressBorrower & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.AddressesBorrower,
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/address-borrower', new AddressBorrower(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('address-borrower')

  service.hooks(hooks)
}
