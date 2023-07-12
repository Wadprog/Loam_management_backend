import { Sequelize, Model } from 'sequelize'

export interface CityInterface {
  id: number
  name: string
  state_id: string
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class City extends Model<CityInterface> implements CityInterface {
    id!: number
    name!: string
    state_id!: string

    static associate(models: any): void {
      City.belongsTo(models.States, {
        foreignKey: {
          allowNull: false,
          name: 'state_id'
        }
      })
      City.hasMany(models.Streets, {
        foreignKey: {
          allowNull: false,
          name: 'city_id'
        }
      })
    }
  }

  City.init(
    {
      id: {
        type: DataTypes.MEDIUMINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },

      state_id: {
        type: DataTypes.MEDIUMINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'states',
          key: 'id'
        }
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    },

    {
      sequelize,
      modelName: 'Cities',
      tableName: 'cities',
      underscored: true
    }
  )

  return City
}
