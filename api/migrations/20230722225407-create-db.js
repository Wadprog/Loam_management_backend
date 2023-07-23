// eslint-disable-next-line @typescript-eslint/no-var-requires
// const app = require('../../src/app')
module.exports = {
  async up() {
    console.log('Migrating... sq')
    // await app.get('sequelizeClient').sync({ alter: true })
    console.log('Migrating... sq')
  },
  async down() {
    await app.get('sequelizeClient').sync({ force: true })
  }
}
