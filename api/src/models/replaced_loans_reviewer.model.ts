// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, Model } from 'sequelize'

export interface ReplacedLoansReviewerInterface {
  reviewer_id: number
  loan_request_id: number
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class ReplacedLoansReviewer
    extends Model<ReplacedLoansReviewerInterface>
    implements ReplacedLoansReviewerInterface
  {
    // eslint-disable-next-line prettier/prettier
    reviewer_id!: number
    loan_request_id!: number

    static associate(models: any): void {
      ReplacedLoansReviewer.belongsTo(models.LoanRequests, {
        as: 'loan_request',
        onDelete: 'CASCADE'
      })
      ReplacedLoansReviewer.belongsTo(models.Employees, {
        as: 'reviewer'
      })
    }
  }

  ReplacedLoansReviewer.init(
    {
      reviewer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      }
    },

    {
      sequelize,
      modelName: 'ReplacedLoansReviewers',
      tableName: 'replaced_loans_reviewers',
      underscored: true
    }
  )

  return ReplacedLoansReviewer
}
