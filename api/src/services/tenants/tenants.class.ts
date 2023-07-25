import { Params } from '@feathersjs/feathers'
import { Service, SequelizeServiceOptions } from 'feathers-sequelize'

import Logger from '../../utils/logger'
import { Application } from '../../declarations'

export class Tenants extends Service {
  app: Application

  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options)
    this.app = app
  }

  async create(data: any): Promise<any> {
    const sequelize = this.app.get('sequelizeClient')
    try {
      await sequelize.query(`Call proc_create_tenants(?)`, {
        replacements: [JSON.stringify(data)],
        type: sequelize.QueryTypes.INSERT
      })

      return Promise.resolve({})
    } catch (e: any) {
      Logger.error(e.message || e)
      throw new Error(e.message || e)
    }
  }
}
