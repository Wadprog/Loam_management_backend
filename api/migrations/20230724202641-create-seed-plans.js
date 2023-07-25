/* eslint-disable @typescript-eslint/no-var-requires */
const plans = require('./data/plans.js')
const fs = require('fs')
const path = require('path')

const planQuery = fs.readFileSync(path.resolve(__dirname, './queries', 'upsert_plans.sql'), 'utf-8')

const featureQuery = fs.readFileSync(path.resolve(__dirname, './queries', 'upsert_features.sql'), 'utf-8')

module.exports = {
  async up(queryInterface) {
    await Promise.all(
      plans.map(async (plan) => {
        const [planId] = await queryInterface.sequelize.query(planQuery, {
          replacements: [plan.name, plan.description, plan.monthly_price, plan.yearly_price],
          type: queryInterface.sequelize.QueryTypes.INSERT
        })

        plan.features.map(async (feature) => {
          await queryInterface.sequelize.query(featureQuery, {
            replacements: [feature.name, feature.status],
            type: queryInterface.sequelize.QueryTypes.INSERT
          })
          const [featureId] = await queryInterface.sequelize.query(
            `SELECT id FROM features WHERE name = '${feature.name}'`
          )

          await queryInterface.sequelize.query(
            `INSERT INTO features_plan (plan_id, feature_id, created_at, updated_at) VALUES (${planId}, ${featureId[0].id}, current_timestamp, current_timestamp)`
          )
        })
      })
    )
  },
  async down(queryInterface) {
    await queryInterface.sequelize.query('seed-roles')
  }
}
