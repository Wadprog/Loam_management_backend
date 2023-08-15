import { HookContext } from '@feathersjs/feathers'
import * as authentication from '@feathersjs/authentication'
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks

export default {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [],
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
    all: [
      (ctx: HookContext) => {
        console.log('called error hook')
        console.log(ctx.error)
        return ctx
      }
    ],
    find: [
      (ctx: HookContext) => {
        console.log('called error after find hook')
        console.log(ctx.error)
        return ctx
      }
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
