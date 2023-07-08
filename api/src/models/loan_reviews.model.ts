// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, Model } from 'sequelize'

export interface LoanReviewInterface {
  id: number
  status: string
  reviewer_id: number
  proposed_amount: number
  loan_request_id: number
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class LoanReview extends Model<LoanReviewInterface> implements LoanReviewInterface {
    // eslint-disable-next-line prettier/prettier
    id!: number
    status!: string
    reviewer_id!: number
    proposed_amount!: number
    loan_request_id!: number

    static associate(models: any): void {
      LoanReview.belongsTo(models.LoanRequests, {
        as: 'loan_request',
        onDelete: 'CASCADE'
      })
      LoanReview.belongsTo(models.Employees, {
        as: 'reviewer'
      })
    }
  }

  LoanReview.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      proposed_amount: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      reviewer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'employees',
          key: 'id'
        }
      },
      loan_request_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'loan_requests',
          key: 'id'
        }
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
        validate: {
          isIn: [['accepted', 'rejected', 'cancelled']]
        }
      }
    },

    {
      sequelize,
      modelName: 'LoanReviews',
      tableName: 'loan_reviews',
      underscored: true
    }
  )

  return LoanReview
}
