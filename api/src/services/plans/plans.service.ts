// Initializes the `plan` service on path `/plans`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { Plan } from './plans.class'
import hooks from './plans.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    plans: Plan & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.Plans,
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/plans', new Plan(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('plans')

  service.hooks(hooks)
}
