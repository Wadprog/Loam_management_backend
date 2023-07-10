/* eslint-disable @typescript-eslint/no-unused-vars */
import { Service, SequelizeServiceOptions } from 'feathers-sequelize'
import { Application } from '../../declarations'

export class Authorization extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options)
  }
}
