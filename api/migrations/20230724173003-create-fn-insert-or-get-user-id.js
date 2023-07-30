/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires

const fs = require('fs')
const path = require('path')

const mainQuery = fs.readFileSync(
  path.resolve(__dirname, './queries', 'functions', 'fn_insert_or_get_user_id.sql'),
  'utf-8'
)

module.exports = {
  async up(queryInterface) {
    try {
      await queryInterface.sequelize.query(mainQuery, { raw: true })
    } catch (e) {
      console.log(e)
    }
  },
  async down() {
    await queryInterface.sequelize.query('DROP FUNCTION IF EXISTS fn_insert_or_get_user_id')
  }
}