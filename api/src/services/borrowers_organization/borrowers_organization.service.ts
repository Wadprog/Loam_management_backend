// Initializes the `borrowers_organization` service on path `/borrowers_organization`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { BorrowersOrganization } from './borrowers_organization.class'

import hooks from './borrowers_organization.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    borrowers_organization: BorrowersOrganization & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.BorrowersTenant,
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/borrowers_organization', new BorrowersOrganization(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('borrowers_organization')

  service.hooks(hooks)
}
