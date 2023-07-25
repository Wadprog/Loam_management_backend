import commonHooks from 'feathers-hooks-common'
import * as local from '@feathersjs/authentication-local'
import * as authentication from '@feathersjs/authentication'

import AutoLoginHook from '../../Hooks/AutoLogin.hook'

const { hashPassword, protect } = local.hooks
const { authenticate } = authentication.hooks

const protectkeys = protect(...['search_vector'])

export default {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: hashPassword('employee.password'),
    update: [commonHooks.disallow('external')],
    patch: [authenticate('jwt'), hashPassword('employee.password')],
    remove: []
  },

  after: {
    all: [],
    find: [protectkeys],
    get: [protectkeys],
    create: [AutoLoginHook],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
