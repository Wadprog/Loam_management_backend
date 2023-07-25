/* eslint-disable @typescript-eslint/no-var-requires */
const roles = require('./data/roles.js')
const fs = require('fs')
const path = require('path')

const roleQuery = fs.readFileSync(path.resolve(__dirname, './queries', 'upsert_roles.sql'), 'utf-8')

const authorisationQuery = fs.readFileSync(
  path.resolve(__dirname, './queries', 'upsert_authorisations.sql'),
  'utf-8'
)

module.exports = {
  async up(queryInterface) {
    await Promise.all(
      roles.map(async (role) => {
        const [roleId] = await queryInterface.sequelize.query(roleQuery, {
          replacements: [role.title, role.customs],
          type: queryInterface.sequelize.QueryTypes.INSERT
        })

        role.authorisations.map(async (authorisation, i) => {
          const [authId] = await queryInterface.sequelize.query(authorisationQuery, {
            replacements: [authorisation.role_details],
            type: queryInterface.sequelize.QueryTypes.INSERT
          })

          await queryInterface.sequelize.query(
            `INSERT INTO authorizations_role (role_id, authorization_id) VALUES (${roleId}, ${authId})`
          )
        })
      })
    )
  },
  async down(queryInterface) {
    await queryInterface.sequelize.query('seed-roles')
  }
}
