import { HookContext } from '@feathersjs/feathers'
import * as authentication from '@feathersjs/authentication'
// Don't remove this comment. It's needed to format import lines nicely.

const attachecCreatorId = (ctx: HookContext) => {
  // const { data, params } = ctx
  // const employeeId = params.employee.id
  ctx.data.creator_id = ctx.params.employee.id

  return ctx
}
const { authenticate } = authentication.hooks

export default {
  before: {
    all: [
      authenticate('jwt'),
      (ctx: HookContext) => {
        console.log('called before all hook')
        return ctx
      }
    ],
    find: [],
    get: [],
    create: [attachecCreatorId],
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
