import { HookContext } from '@feathersjs/feathers'
import * as authentication from '@feathersjs/authentication'
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks

export default {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [
      (ctx: HookContext) => {
        console.log('called create hook')
        console.log(ctx.data)
        return ctx
      }
    ],
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
    create: [
      (ctx: HookContext) => {
        console.log('called error hook')
        console.log(ctx.error)
        return ctx
      }
    ],
    update: [],
    patch: [],
    remove: []
  }
}
