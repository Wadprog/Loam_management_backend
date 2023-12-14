/* eslint-disable no-unused-vars */
import { BadRequest } from '@feathersjs/errors'
import { HookContext } from '@feathersjs/feathers'
import { Id } from '@feathersjs/feathers'
import { Sequelize } from 'sequelize'

// const queryClause = (context: HookContext, where: any) => {}
// const loanQuery = (employeeId: number, context: HookContext) => {}

export default (
    queryClause: (context: HookContext, where: any) => any,
    specificQuery: (id: Id, seq: Sequelize, excludes: string[]) => any
  ) =>
  (context: HookContext) => {
    const { app, params } = context
    const employeeId = params.employee.id
    const service = context.app.service(context.path)
    if (!employeeId) {
      throw new BadRequest(`You must be logged in to view ${service.name}}`)
    }

    const sequelize = app.get('sequelizeClient')
    const attributes = specificQuery(employeeId, sequelize, [])

    const { query: where } = service.filterQuery(context.params)
    if (context.method === 'get') where.id = context.id
    const clause = queryClause(context, where)

    params.sequelize = {
      logging: console.log,
      where: clause,
      attributes
    }
    return context
  }
