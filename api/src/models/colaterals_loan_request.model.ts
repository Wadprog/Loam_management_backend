import { Sequelize, Model } from 'sequelize'

export interface ColateralsLoanRequestInterface {
  valuation: number
  colateral_id: number
  loanRequest_id: number
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class ColateralsLoanRequest
    extends Model<ColateralsLoanRequestInterface>
    implements ColateralsLoanRequestInterface
  {
    valuation!: number
    colateral_id!: number
    loanRequest_id!: number

    // static associate(models: any): void {}
  }

  ColateralsLoanRequest.init(
    {
      valuation: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      colateral_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'colaterals',
          key: 'id'
        }
      },
      loanRequest_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'loan_requests',
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
