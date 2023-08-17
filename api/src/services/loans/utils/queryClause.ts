import { HookContext } from '@feathersjs/feathers'
// import { Op } from '@sequelize/core'

export default (context: HookContext, where: any) => {
  //   const { app, params } = context
  //   const sequelize = app.get('sequelizeClient')

  const clause = where
  return clause
}
