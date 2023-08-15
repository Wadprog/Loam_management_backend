/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('config')

const env = process.env?.NODE_ENV?.trim() || 'development'

const dotenv = require('dotenv')
const path = require('path')
dotenv.config({ path: path.resolve(__dirname, '../../../.env') })

const username = process.env.DB_USER_LOCAL_DEV
const password = process.env.DB_PASSWORD_LOCAL_DEV
const database = process.env.DB_DATABASE_LOCAL_DEV
const dialect = process.env.SEQUELIZE_DIALECT
const host = process.env.DB_HOST_LOCAL_DEV

// console.log({ dbUser, dbPassword, dbDatabase, dbHost })
// change username to root to have access to create functions and procedures

// const dbSettings = config.get('dbSettings')
const settings = { username, password, database, dialect, host }
//  { ...dbSettings, username: 'root' }

console.log({ settings })

module.exports = {
  [env]: {
    ...settings
  }
}
