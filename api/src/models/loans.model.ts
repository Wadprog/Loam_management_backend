// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, Model } from 'sequelize'

export interface LoanInterface {
  id: number
  score: number
  issue_date: Date
  next_payment: Date
  creator_id: number
  maturity_date: Date
  loan_status: string
  debt_balance: number
  interest_balance: number
  accepted_loan_review_id: number
  amount_payment_made: number
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class Loan extends Model<LoanInterface> implements LoanInterface {
    // eslint-disable-next-line prettier/prettier
    id!: number
    loan_status!: string
    next_payment!: Date
    issue_date!: Date
    maturity_date!: Date
    debt_balance!: number
    interest_balance!: number
    principal_debt!: number
    score!: number
    loan_request_id!: number
    creator_id!: number
    accepted_loan_review_id!: number
    amount_payment_made!: number

    // static associate(models: any): void {
    //   Loan.belongsToMany(models.Tenants, {
    //     through: 'loan_organization',
    //     onDelete: 'CASCADE'
    //   })
    //   Loan.belongsTo(models.Borrowers, {})
    // }
  }

  Loan.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      debt_balance: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      amount_payment_made: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      interest_balance: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      next_payment: {
        type: DataTypes.DATE,
        allowNull: false
      },
      issue_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now()
      },
      maturity_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      loan_status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
        validate: {
          isIn: [['active', 'paid', 'canceled']]
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
      accepted_loan_review_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'loan_reviews',
          key: 'id'
        }
      }
    },

    {
      sequelize,
      modelName: 'Loans',
      tableName: 'loans',
      underscored: true
    }
  )

  return Loan
}
