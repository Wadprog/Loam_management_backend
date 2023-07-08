// Initializes the `loan_reviews` service on path `/loan-reviews`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { LoanReviews } from './loan_reviews.class'
import hooks from './loan_reviews.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'loan-reviews': LoanReviews & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate'),
    Model: app.get('sequelizeClient').models.LoanReviews
  }

  // Initialize our service with any options it requires
  app.use('/loan-reviews', new LoanReviews(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('loan-reviews')

  service.hooks(hooks)
}
