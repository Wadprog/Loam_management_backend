// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, Model } from 'sequelize'

export interface LoanInterface {
  id: number
  active: boolean
  original_amount: number
  next_payment: Date
  issue_date: Date
  maturity_date: Date
  debt_balance: number
  interest_balance: number
  score: number
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class Loan extends Model<LoanInterface> implements LoanInterface {
    // eslint-disable-next-line prettier/prettier
    id!: number
    active!: boolean
    original_amount!: number
    next_payment!: Date
    issue_date!: Date
    maturity_date!: Date
    debt_balance!: number
    interest_balance!: number
    principal_debt!: number
    score!: number

    static associate(models: any): void {
      Loan.belongsToMany(models.Customers, {
        through: 'loan_organization',
        onDelete: 'CASCADE'
      })
      Loan.belongsTo(models.Borrowers, {})
    }
  }

  Loan.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      original_amount: {
        type: DataTypes.DOUBLE,
        allowNull: false
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
      interest_balance: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      next_payment: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      issue_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      maturity_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
