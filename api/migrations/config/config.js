/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('config')

const env = process.env?.NODE_ENV?.trim() || 'development'

// change username to root to have access to create functions and procedures

const dbSettings = config.get('dbSettings')
const settings = { ...dbSettings, username: 'root' }

module.exports = {
  [env]: {
    ...settings
  }
}
