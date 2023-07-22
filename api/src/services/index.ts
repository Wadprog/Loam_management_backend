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
import contracts from './contracts/contracts.service'
import contractsLoan from './contracts-loan/contracts-loan.service'

import tags from './tags/tags.service'

import comments from './comments/comments.service'

import countries from './countries/countries.service'

import states from './states/states.service'

import cities from './cities/cities.service'

import streets from './streets/streets.service'

import addressTypes from './address-types/address-types.service'

import addresses from './addresses/addresses.service'

import addressesUser from './addresses-user/addresses-user.service'

import addressBorrower from './address-borrower/address-borrower.service'

import previousAddress from './previous-address/previous-address.service'

import phones from './phones/phones.service'

import phoneTypes from './phone-types/phone-types.service'

import phonesUser from './phones-user/phones-user.service'

import settings from './settings/settings.service'

import configurations from './configurations/configurations.service'

import tenants from './tenants/tenants.service'

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
  app.configure(contracts)
  app.configure(contractsLoan)
  app.configure(tags)
  app.configure(comments)
  app.configure(countries)
  app.configure(states)
  app.configure(cities)
  app.configure(streets)
  app.configure(addressTypes)
  app.configure(addresses)
  app.configure(addressesUser)
  app.configure(addressBorrower)
  app.configure(previousAddress)
  app.configure(phones)
  app.configure(phoneTypes)
  app.configure(phonesUser)
  app.configure(settings)
  app.configure(configurations)
  app.configure(tenants)
}
