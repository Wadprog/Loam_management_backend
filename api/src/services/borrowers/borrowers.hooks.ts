import { HookContext } from '@feathersjs/feathers'
import * as feathersAuthentication from '@feathersjs/authentication'

const { authenticate } = feathersAuthentication.hooks

const attachecCreatorId = (ctx: HookContext) => {
  // const { data, params } = ctx
  // const employeeId = params.employee.id
  // data.creatorId = employeeId

  console.log('called create hook')
  return ctx
}

export default {
  before: {
    all: authenticate('jwt'),
    find: [],
    get: [],
    create: attachecCreatorId,
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
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
