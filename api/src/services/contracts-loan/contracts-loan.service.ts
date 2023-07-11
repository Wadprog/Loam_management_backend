// Initializes the `contractsLoan` service on path `/contracts-loan`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { ContractsLoan } from './contracts-loan.class'
import createModel from '../../models/contracts-loan.model'
import hooks from './contracts-loan.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'contracts-loan': ContractsLoan & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.ContractsLoan,
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/contracts-loan', new ContractsLoan(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('contracts-loan')

  service.hooks(hooks)
}
