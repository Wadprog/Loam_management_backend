import { create } from 'lodash'
import { Sequelize, Model } from 'sequelize'

export interface LoanPlansInterface {
  id: number
  tenant_id: number
  creator_id: number
  payment_interval: number
  payment_frequency: string
  interest_percentage: number
  loan_term: number
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class LoanPlans extends Model<LoanPlansInterface> implements LoanPlansInterface {
    // eslint-disable-next-line prettier/prettier
    id!: number
    tenant_id!: number
    creator_id!: number
    payment_interval!: number
    payment_frequency!: string
    interest_percentage!: number
    loan_term!: number

    // static associate(models: any): void {
    //   LoanPlans.belongsTo(models.Tenants)
    //   LoanPlans.belongsTo(models.Borrowers, {})
    //   LoanPlans.belongsTo(models.Employees, { as: 'reviewer' })
    // }
  }

  LoanPlans.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      tenant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'tenants',
          key: 'id'
        }
      },
      creator_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'id'
        }
      },
      payment_interval: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      payment_frequency: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['daily', 'weekly', 'monthly', 'yearly']]
        }
      },
      interest_percentage: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      loan_term: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },

    {
      sequelize,
      modelName: 'LoanPlans',
      tableName: 'loan_plans',
      underscored: true,
      createdAt: false,
      updatedAt: false,
      timestamps: false
    }
  )

  return LoanPlans
}
