// Initializes the `fraud_logs` service on path `/fraud-logs`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { FraudLogs } from './fraud_logs.class'
import hooks from './fraud_logs.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'fraud-logs': FraudLogs & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.FraudLogs,
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/fraud-logs', new FraudLogs(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('fraud-logs')

  service.hooks(hooks)
}
