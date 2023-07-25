/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires

const fs = require('fs')
const path = require('path')

const mainQuery = fs.readFileSync(path.resolve(__dirname, './queries', 'main.sql'), 'utf-8')

module.exports = {
  async up(queryInterface) {
    // split the mainQuery by CREATE statement so I can run each query separately
    mainQuery.split('CREATE').forEach(async (query, idx) => {
      const trimmedQuery = query.trim()
      if (trimmedQuery && trimmedQuery.startsWith('--') === false) {
        try {
          await queryInterface.sequelize.query(`CREATE ${trimmedQuery}`, { raw: true })
        } catch (e) {
          console.error(` Error at index ${idx} in query: ${trimmedQuery}`)
          console.log(e.message)
        }
      }
    })

    // await queryInterface.sequelize.query(mainQuery, { raw: true })
  },
  async down() {
    await app.get('sequelizeClient').sync({ force: true })
  }
}
