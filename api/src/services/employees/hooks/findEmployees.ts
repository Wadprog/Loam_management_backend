import { HookContext } from '@feathersjs/feathers'

import employeeQueryAttributes from './lib/queryAttributes'

export default (context: HookContext) => {
  const { app, params } = context
  const sequelize = app.get('sequelizeClient')

  const { query: where } = context.app.service(context.path).filterQuery(context.params)
  if (context.method === 'get') where.id = context.id
  // const clause = queryClause(context, where)
  const attributes = employeeQueryAttributes(sequelize)

  params.sequelize = {
    // logging: console.log,
    where,
    attributes
  }
}
