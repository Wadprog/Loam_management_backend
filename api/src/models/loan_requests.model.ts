// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, Model } from 'sequelize'

export interface LoanRequestsInterface {
  id: number
  status: string
  reviewer_id: number
  borrower_id: number
  request_amount: number
  tenant_id: number
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class LoanRequests extends Model<LoanRequestsInterface> implements LoanRequestsInterface {
    // eslint-disable-next-line prettier/prettier
    id!: number
    status!: string
    reviewer_id!: number
    borrower_id!: number
    request_amount!: number
    tenant_id!: number

    static associate(models: any): void {
      LoanRequests.belongsTo(models.Tenants)
      LoanRequests.belongsTo(models.Borrowers, {})
      LoanRequests.belongsTo(models.Employees, { as: 'reviewer' })
    }
  }

  LoanRequests.init(
    {
      request_amount: {
        defaultValue: 0,
        allowNull: false,
        type: DataTypes.DOUBLE
      },
      reviewer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'employees',
          key: 'id'
        }
      },

      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
        validate: {
          isIn: [['pending', 'approved', 'rejected', 'cancelled', 'processing']]
        }
      },
      borrower_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'borrowers',
          key: 'id'
        }
      },
      tenant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'tenants',
          key: 'id'
        }
      },

      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      }
    },

    {
      sequelize,
      modelName: 'LoanRequests',
      tableName: 'loan_requests',
      underscored: true
    }
  )

  return LoanRequests
}
