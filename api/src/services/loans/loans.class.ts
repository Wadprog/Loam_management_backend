import { Service, SequelizeServiceOptions } from 'feathers-sequelize'
import { Application } from '../../declarations'
import Logger from '../../utils/logger'

export class Loans extends Service {
  app: Application
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options)
    this.app = app
  }

  async create(data: any, params: any) {
    const creator_id = params.employee.id

    const sequelize = this.app.get('sequelizeClient')
    try {
      const newLoan = await sequelize.query(`CALL proc_create_loan(?,?,?)`, {
        replacements: [creator_id, data.accepted_loan_review_id, new Date()],
        type: sequelize.QueryTypes.INSERT
      })
      console.log('newLoan', newLoan)
      return Promise.resolve(newLoan || { message: 'Loan created successfully' })
    } catch (error: any) {
      Logger.error(error)
      throw new Error(error)
    }
  }
}
