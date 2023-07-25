import commonHooks from 'feathers-hooks-common'
import * as feathersAuthentication from '@feathersjs/authentication'
import * as local from '@feathersjs/authentication-local'
// Don't remove this comment. It's needed to format import lines nicely.

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
export default {
  before: {
    all: [authenticate('jwt')],
    find: [],
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
