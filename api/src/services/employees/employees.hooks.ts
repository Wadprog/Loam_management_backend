/* eslint-disable @typescript-eslint/ban-ts-comment */
import commonHooks from 'feathers-hooks-common'
import * as feathersAuthentication from '@feathersjs/authentication'
import * as local from '@feathersjs/authentication-local'

import Assoc from '../../Hooks/AddAssoc.hook'

const { authenticate } = feathersAuthentication.hooks
const { hashPassword, protect } = local.hooks

const protectkeys = protect(
  ...[
    'password',
    'verifyToken',
    'resetToken',
    'resetShortToken',
    'resetExpires',
    'verifyShortToken',
    'activationKey',
    'resetPasswordKey',
    'verifyExpires',
    'search_vector'
  ]
)

const preventChanges = [
  'email',
  'isVerified',
  'verifyToken',
  'verifyShortToken',
  'verifyExpires',
  'verifyChanges',
  'resetToken',
  'resetShortToken',
  'resetExpires',
  'activationKey',
  'resetPasswordKey',
  'password'
]

const assocEmployee = Assoc({
  models: [
    {
      model: 'Tenants',
      modelName: 'tenant'
    },
    {
      model: 'People'
    }
  ]
})
export default {
  before: {
    all: [authenticate('jwt')],
    find: [assocEmployee],
    get: [],
    create: [hashPassword('password')],
    update: commonHooks.disallow(),
    patch: [
      hashPassword('password'),
      commonHooks.iff(commonHooks.isProvider('external'), commonHooks.preventChanges(true, ...preventChanges))
    ],
    remove: commonHooks.disallow()
  },

  after: {
    all: [protectkeys]
  }
}
