import { Sequelize, Model } from 'sequelize'

export interface ReplacedLoansReviewerInterface {
  new_reviewer_id: number
  previous_reviewer_id: number
  loan_request_id: number
  modifier_id: number
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class ReplacedLoansReviewer
    extends Model<ReplacedLoansReviewerInterface>
    implements ReplacedLoansReviewerInterface
  {
    // eslint-disable-next-line prettier/prettier
    modifier_id!: number
    new_reviewer_id!: number
    loan_request_id!: number
    previous_reviewer_id!: number

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
      new_reviewer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'id'
        }
      },
      previous_reviewer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'id'
        }
      },

      modifier_id: {
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
