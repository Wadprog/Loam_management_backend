// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, Model } from 'sequelize'

export interface ColateralInterface {
  id: string
  name: string
  description: unknown
  in_active_loan: boolean
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class Colateral extends Model<ColateralInterface> implements ColateralInterface {
    // eslint-disable-next-line prettier/prettier

    id!: string
    name!: string
    description!: unknown
    in_active_loan!: boolean

    static associate(models: any): void {
      Colateral.belongsToMany(models.Medias, { through: 'colaterals_media' })

      Colateral.belongsTo(models.Borrowers, {})
      Colateral.belongsToMany(models.Loans, {
        through: 'colaterals_loan',
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'colateral_id',
          allowNull: false
        }
      })
      // Colateral.belongsTo(models.Colateral, {})
    }
  }

  Colateral.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false
      },

      description: {
        type: DataTypes.JSON,
        allowNull: false
      },
      in_active_loan: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },

    {
      sequelize,
      modelName: 'Colaterals',
      tableName: 'colaterals'
    }
  )

  return Colateral
}
