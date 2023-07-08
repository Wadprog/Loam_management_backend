// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, Model } from 'sequelize'

export interface ColateralsLoanRequestInterface {
  pre_market_value: number
  loan_request_id: number
  colateral_id: number
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class ColateralsLoanRequest
    extends Model<ColateralsLoanRequestInterface>
    implements ColateralsLoanRequestInterface
  {
    // eslint-disable-next-line prettier/prettier
    pre_market_value!: number
    loan_request_id!: number
    colateral_id!: number

    static associate(models: any): void {
      ColateralsLoanRequest.belongsTo(models.Borrowers, {})
      ColateralsLoanRequest.belongsTo(models.Customers, { as: 'organization' })
    }
  }

  ColateralsLoanRequest.init(
    {
      pre_market_value: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.0
      },
      loan_request_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'loan_requests',
          key: 'id'
        }
      },
      colateral_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'colaterals',
          key: 'id'
        }
      }
    },

    {
      sequelize,
      modelName: 'ColateralsLoanRequest',
      tableName: 'colaterals_loan_request',
      underscored: true
    }
  )

  return ColateralsLoanRequest
}
