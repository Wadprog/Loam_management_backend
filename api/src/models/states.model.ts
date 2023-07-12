import { Sequelize, Model } from 'sequelize'

export interface StateInterface {
  id: number
  name: string
  country_id: string
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class State extends Model<StateInterface> implements StateInterface {
    id!: number
    name!: string
    country_id!: string

    static associate(models: any): void {
      State.belongsTo(models.Countries, {
        foreignKey: {
          allowNull: false,
          name: 'country_id'
        }
      })
      State.hasMany(models.Cities, {
        foreignKey: {
          allowNull: false,
          name: 'state_id'
        }
      })
    }
  }

  State.init(
    {
      id: {
        type: DataTypes.MEDIUMINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },

      country_id: {
        type: DataTypes.MEDIUMINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'countries',
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
      modelName: 'States',
      tableName: 'states',
      underscored: true
    }
  )

  return State
}
