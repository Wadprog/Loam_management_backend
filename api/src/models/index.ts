import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'

/** Local dependencies */
import { Application } from '../declarations'
/** Tables */

export default function (app: Application): void {
  const dir = fs.readdirSync(__dirname)
  dir.forEach((file) => {
    if (file === 'index.ts') return
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const model = require(path.join(__dirname, file)).default
    model(app.get('sequelizeClient'), Sequelize.DataTypes)
  })
}
