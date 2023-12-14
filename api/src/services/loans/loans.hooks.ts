import { HookContext } from '@feathersjs/feathers'
import * as authentication from '@feathersjs/authentication'

import findLoans from './hooks/findLoans'

const attachecCreatorId = (ctx: HookContext) => {
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
    find: findLoans,
    get: [],
    create: [attachecCreatorId],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [
      (ctx: HookContext) => {
        console.log('called after all hook')
        console.log(ctx.result)
        return ctx
      }
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [
      (ctx: HookContext) => {
        console.log(ctx.error)
        return ctx
      }
    ],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
