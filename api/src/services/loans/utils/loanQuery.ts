import fs from 'fs'
import path from 'path'
import { Id } from '@feathersjs/feathers'
import { Sequelize } from 'sequelize'

const borrowerQuery = fs.readFileSync(path.join(__dirname, '../sql', 'borrowerQuery.sql'), 'utf8')
const planQuery = fs.readFileSync(path.join(__dirname, '../sql', 'planQuery.sql'), 'utf8')

export default (employeeId: Id, sequelize: Sequelize, exclude: string[] = []) => {
  console.log('employeeId', employeeId)

  const excludeQuery = [
    ...exclude,
    'createdAt',
    'updatedAt',
    'accepted_loan_review_id',
    'creator_id',
    'issue_date'
  ]
  return {
    include: [
      //   [sequelize.literal(creatorQuery), 'creator'],
      [sequelize.literal(`(${planQuery}) `), 'plan'],
      [sequelize.literal(`(${borrowerQuery}) `), 'borrower']
    ],
    exclude: excludeQuery
  }
}
