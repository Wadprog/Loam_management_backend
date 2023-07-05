// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, Model } from 'sequelize'

export interface BorrowerInterface {
  id: string
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class Borrower extends Model<BorrowerInterface> implements BorrowerInterface {
    // eslint-disable-next-line prettier/prettier

    id!: string

    static associate(models: any): void {
      Borrower.belongsToMany(models.Customers, {
        through: 'borrower_organization',
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'org_id'
        }
      })
      Borrower.belongsTo(models.People, {})
    }
  }

  Borrower.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      }
    },

    {
      sequelize,
      modelName: 'Borrowers',
      tableName: 'borrowers'
    }
  )

  return Borrower
}
