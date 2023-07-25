import assign from 'lodash/assign'
import { Sequelize } from 'sequelize'

/** Custom dependencies */
import Logger from './utils/logger'
import { Application } from './declarations'

export default function (app: Application): void {
  const dbSettings = app.get('dbSettings')
  if (!dbSettings) {
    Logger.error('No database settings')
    process.exit(1)
  }

  const settings = assign(dbSettings, { seederStorge: 'sequelize' }, { logging: false })

  const sequelize = settings.url ? new Sequelize(settings.url, settings) : new Sequelize(settings)
  const oldSetup = app.setup

  app.set('sequelizeClient', sequelize)

  app.setup = function (...args): Application {
    const result = oldSetup.apply(this, args)

    // Sync to the database
    app.set('sequelizeSync', () => sequelize.sync({ force: true }))

    return result
  }
  function startSequelize() {
    const { models } = sequelize
    Object.keys(models).forEach((name) => {
      if ('associate' in models[name]) {
        ;(models[name] as any).associate(models)
      }
    })
  }
  app.set('startSequelize', startSequelize)
}
