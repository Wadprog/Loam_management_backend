// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, Model } from 'sequelize'

export interface BorrowerInterface {
  id: number
  global_credit_score: number
  loan_amounts: number
  active_loans: number
  person_id: number
  creator_id: number
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class Borrower extends Model<BorrowerInterface> implements BorrowerInterface {
    // eslint-disable-next-line prettier/prettier

    id!: number
    global_credit_score!: number
    loan_amounts!: number
    active_loans!: number
    person_id!: number
    creator_id!: number

    static associate(models: any): void {
      Borrower.hasMany(models.Loans, {})
      Borrower.belongsTo(models.People, {
        foreignKey: {
          allowNull: false,
          name: 'person_id'
        },
        constraints: true
      }) // is a person
      Borrower.hasMany(models.Colaterals, {})
      // Borrower.hasMany(models.BorrowersTenant, {
      //   foreignKey: {
      //     allowNull: false
      //   }
      // }) // belongs to many organizations
    }
  }

  Borrower.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      person_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'people',
          key: 'id'
        }
      },
      creator_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'employees',
          key: 'id'
        }
      },
      loan_amounts: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0
      },
      active_loans: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0
      },
      global_credit_score: {
        type: DataTypes.SMALLINT.UNSIGNED,
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
