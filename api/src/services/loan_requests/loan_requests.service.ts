// Initializes the `loan_requests` service on path `/loan-requests`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { LoanRequests } from './loan_requests.class'
import hooks from './loan_requests.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'loan-requests': LoanRequests & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.LoanRequests,
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/loan-requests', new LoanRequests(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('loan-requests')

  service.hooks(hooks)
}
