import { HookContext } from '@feathersjs/feathers'

export default (context: HookContext): HookContext => {
  const { params } = context
  context.data.requesterId = params.employee.id
  return context
}
