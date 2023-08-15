// Initializes the `loan_plans` service on path `/loan-plans`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { LoanPlans } from './loan_plans.class'
import hooks from './loan_plans.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    loan_plans: LoanPlans & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.LoanPlans,
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/loan_plans', new LoanPlans(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('loan_plans')

  service.hooks(hooks)
}
