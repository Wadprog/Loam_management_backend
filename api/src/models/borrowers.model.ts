// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, Model } from 'sequelize'

export interface BorrowerInterface {
  id: string
  global_credit_score: number
  loan_amounts: number
  active_loans: number
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class Borrower extends Model<BorrowerInterface> implements BorrowerInterface {
    // eslint-disable-next-line prettier/prettier

    id!: string
    global_credit_score!: number
    loan_amounts!: number
    active_loans!: number

    static associate(models: any): void {
      Borrower.hasMany(models.Loans, {})
      Borrower.belongsTo(models.People, {}) // is a person
      Borrower.hasMany(models.Colaterals, {})
      Borrower.hasMany(models.BorrowersOrganization, {
        foreignKey: {
          allowNull: false
        }
      }) // belongs to many organizations
    }
  }

  Borrower.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      loan_amounts: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      active_loans: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      global_credit_score: {
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
      modelName: 'Borrowers',
      tableName: 'borrowers',
      underscored: true
    }
  )

  return Borrower
}
