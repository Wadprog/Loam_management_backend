import { Application } from '../declarations'
import employees from './employees/employees.service'
import customers from './customers/customers.service'

import borrowers from './borrowers/borrowers.service'

import loans from './loans/loans.service'

import instalments from './instalments/instalments.service'

import borrowersOrganization from './borrowers_organization/borrowers_organization.service'

import loanRequests from './loan_requests/loan_requests.service'

import loanReviews from './loan_reviews/loan_reviews.service'

import colateral from './colateral/colateral.service'

import medias from './medias/medias.service'

import permitions from './authorizations/authorizations.service'

import roles from './roles/roles.service'

import authorizationsroles from './authorizationsroles/authorizationsroles.service'

import rolesTenant from './roles-tenant/roles-tenant.service'

// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(employees)
  app.configure(customers)
  app.configure(borrowers)
  app.configure(loans)
  app.configure(instalments)
  app.configure(borrowersOrganization)
  app.configure(loanRequests)
  app.configure(loanReviews)
  app.configure(colateral)
  app.configure(medias)
  app.configure(permitions)
  app.configure(roles)
  app.configure(authorizationsroles)
  app.configure(rolesTenant)
}
