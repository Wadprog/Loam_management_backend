// Initializes the `colateral` service on path `/colaterals`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { Colateral } from './colateral.class'
import hooks from './colateral.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    colaterals: Colateral & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate'),
    Model: app.get('sequelizeClient').models.Colaterals
  }

  // Initialize our service with any options it requires
  app.use('/colaterals', new Colateral(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('colaterals')

  service.hooks(hooks)
}
