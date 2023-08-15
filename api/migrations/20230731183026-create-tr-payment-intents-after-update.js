/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires

const fs = require('fs')
const path = require('path')

const mainQuery = fs.readFileSync(
  path.resolve(__dirname, './queries', 'triggers', 'tr_payment_intents_after_update.sql'),
  'utf-8'
)

module.exports = {
  async up(queryInterface) {
    try {
      await queryInterface.sequelize.query(mainQuery, { raw: true })
    } catch (e) {
      if (e.original.code !== 'ER_SP_ALREADY_EXISTS') console.log(e)
    }
  },
  async down() {
    await queryInterface.sequelize.query('DROP TRIGGER IF EXISTS tr_payment_intents_after_update')
  }
}
