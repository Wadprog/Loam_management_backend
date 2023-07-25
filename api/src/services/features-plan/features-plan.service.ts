// Initializes the `features-plan` service on path `/features-plan`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { FeaturesPlan } from './features-plan.class'
import hooks from './features-plan.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'features-plan': FeaturesPlan & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.FeaturesPlan,
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/features-plan', new FeaturesPlan(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('features-plan')

  service.hooks(hooks)
}
