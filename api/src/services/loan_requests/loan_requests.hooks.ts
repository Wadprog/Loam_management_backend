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
        ctx.data.tenant_id = ctx.params.employee.tenant_id
        if (!ctx.data.hasOwnProperty('borrower_id'))
          if (ctx.data.hasOwnProperty('borrower')) ctx.data.borrower_id = ctx.data.borrower
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
    all: [
      (ctx: any) => {
        console.log('called error hook')
        console.log(ctx.error)
        return ctx
      }
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
