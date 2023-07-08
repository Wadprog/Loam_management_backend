// Initializes the `employees` service on path `/employees`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { Employees } from './employees.class'
import hooks from './employees.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    employees: Employees & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const { models } = app.get('sequelizeClient')
  const options = {
    Model: models.Employees,
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/employees', new Employees(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('employees')

  service.hooks(hooks)
}
