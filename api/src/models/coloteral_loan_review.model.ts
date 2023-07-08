// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, Model } from 'sequelize'

export interface ColateralsLoanReViewInterface {
  colateral_id: number
  loan_review_id: number
  market_value: number
  max_estimated_value: number
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class ColateralsLoanReView
    extends Model<ColateralsLoanReViewInterface>
    implements ColateralsLoanReViewInterface
  {
    // eslint-disable-next-line prettier/prettier

    colateral_id!: number
    market_value!: number
    loan_review_id!: number
    max_estimated_value!: number

    static associate(models: any): void {
      ColateralsLoanReView.belongsTo(models.Borrowers, {})
      ColateralsLoanReView.belongsTo(models.Customers, { as: 'organization' })
    }
  }

  ColateralsLoanReView.init(
    {
      market_value: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.0
      },
      max_estimated_value: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.0
      },
      loan_review_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'loan_reviews',
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
      modelName: 'ColateralsLoanReView',
      tableName: 'colaterals_loan_review',
      underscored: true
    }
  )

  return ColateralsLoanReView
}
