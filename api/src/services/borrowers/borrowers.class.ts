import { Service, SequelizeServiceOptions } from 'feathers-sequelize'
import { Application } from '../../declarations'

export class Borrowers extends Service {
  app: Application
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options)
    this.app = app
  }

  async create(data: any, params: any) {
    console.log('called create')
    // first create the person record
    const sequelizeClient = this.app.get('sequelizeClient')
    const { Borrowers, People } = sequelizeClient.models
    const { id: creator_id, tenant_id } = params.employee

    try {
      const peopleReaponse = await People.create({ ...data, tenant_id })

      const borrowerResponse = await Borrowers.create({ person_id: peopleReaponse.id, creator_id, tenant_id })
      console.log({ borrowerResponse })
      return Promise.resolve(borrowerResponse)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }
}
