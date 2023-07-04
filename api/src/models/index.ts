import Sequelize from 'sequelize'

/** Local dependencies */
import { Application } from '../declarations'
/** Tables */
import clients from './clients.model'

const tables = [clients]

export default function (app: Application): void {
  const sequelize = app.get('sequelizeClient')

  tables.forEach((table) => {
    table(sequelize, Sequelize.DataTypes)
  })
}
