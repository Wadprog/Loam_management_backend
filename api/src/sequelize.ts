import { Sequelize } from 'sequelize'
import { Application } from './declarations'

export default function (app: Application): void {
  const dbSettings = app.get('dbSettings')
  if (!dbSettings) {
    throw new Error('No database settings')
    process.exit(1)
  }

  const sequelize = dbSettings.url
    ? new Sequelize(dbSettings.url)
    : new Sequelize({
        logging: false,
        ...dbSettings,
        seederStorge: 'sequelize'
      })
  const oldSetup = app.setup

  app.set('sequelizeClient', sequelize)

  app.setup = function (...args): Application {
    const result = oldSetup.apply(this, args)

    // Sync to the database
    app.set('sequelizeSync', sequelize.sync({ alter: true }))

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
