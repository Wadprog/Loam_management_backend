import Sequelize from 'sequelize'

/** Local dependencies */
import { Application } from '../declarations'
/** Tables */
import person from './people.model'
import customers from './customers.model'
import employess from './employees.model'
import borrowers from './borrowers.model'

const tables = [person, customers, employess, borrowers]

export default function (app: Application): void {
  const sequelize = app.get('sequelizeClient')

  tables.forEach((table) => {
    table(sequelize, Sequelize.DataTypes)
  })
}
