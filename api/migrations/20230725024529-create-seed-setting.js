/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const settings = require('./data/settings.js')

const settingQuery = fs.readFileSync(path.resolve(__dirname, './queries', 'upsert_settings.sql'), 'utf-8')

module.exports = {
  async up(queryInterface) {
    await Promise.all(
      settings.map((setting) =>
        queryInterface.sequelize.query(settingQuery, {
          replacements: [setting.title, setting.allow_action],
          type: queryInterface.sequelize.QueryTypes.INSERT
        })
      )
    )
  },
  async down(queryInterface) {
    await queryInterface.sequelize.query('seed-roles')
  }
}
