/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires

const fs = require('fs')
const path = require('path')

const mainQuery = fs.readFileSync(path.resolve(__dirname, './queries', 'main.sql'), 'utf-8')

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
module.exports = {
  async up(queryInterface) {
    // split the mainQuery by CREATE statement so I can run each query separately
    mainQuery.split('CREATE').map(async (query, idx) => {
      const trimmedQuery = query.trim()
      if (trimmedQuery && trimmedQuery.startsWith('--') === false) {
        try {
          await queryInterface.sequelize.query(`CREATE ${trimmedQuery}`, { raw: true })
          await sleep(3000)
        } catch (e) {
          console.error(
            ` Error at table ${idx} in table: ${
              trimmedQuery.split('TABLE IF NOT EXISTS `prestamo_db`.`')[1].split('`')[0]
            }`
          )
          console.log(e)
        }
      }
    })

    // await queryInterface.sequelize.query(mainQuery, { raw: true })
  },
  async down() {
    await app.get('sequelizeClient').sync({ force: true })
  }
}
