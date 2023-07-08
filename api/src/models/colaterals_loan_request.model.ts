// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, Model } from 'sequelize'

export interface BorrowersOrganizationInterface {
  credit_score: number
  loan_amounts: number
  active_loans: number
  borrower_id: number
  organization_id: number
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class BorrowersOrganization
    extends Model<BorrowersOrganizationInterface>
    implements BorrowersOrganizationInterface
  {
    // eslint-disable-next-line prettier/prettier

    credit_score!: number
    loan_amounts!: number
    active_loans!: number
    borrower_id!: number
    organization_id!: number

    static associate(models: any): void {
      BorrowersOrganization.belongsTo(models.Borrowers, {})
      BorrowersOrganization.belongsTo(models.Customers, { as: 'organization' })
    }
  }

  BorrowersOrganization.init(
    {
      loan_amounts: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
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
      organization_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'customers',
          key: 'id'
        }
      },
      active_loans: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      credit_score: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
        validate: {
          min: 0.0,
          max: 1.0
        }
      }
    },

    {
      sequelize,
      modelName: 'BorrowersOrganization',
      tableName: 'borrowers_organization',
      underscored: true
    }
  )

  return BorrowersOrganization
}
