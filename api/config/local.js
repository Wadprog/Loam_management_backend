/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

console.log('DB_USER', process.env.DB_HOST_LOCAL_DEV)
module.exports = {
  dbSettings: {
    username: 'DB_USER',
    password: 'DB_PASSWORD',
    database: 'DB_DATABASE',
    host: 'DB_HOST'
  }
}
