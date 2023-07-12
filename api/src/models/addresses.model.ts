import { underscore } from '@sequelize/core/types/utils/string'
import { Sequelize, Model } from 'sequelize'

export interface AddressInterface {
  id: number
  city_id: number
  state_id: number
  street_id: number
  country_id: number
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class Address extends Model<AddressInterface> implements AddressInterface {
    id!: number
    city_id!: number
    state_id!: number
    street_id!: number
    country_id!: number

    static associate(models: any): void {
      Address.belongsTo(models.Countries, {
        foreignKey: {
          allowNull: false,
          name: 'country_id'
        }
      })
      Address.belongsTo(models.Cities, {
        foreignKey: {
          allowNull: false,
          name: 'city_id'
        }
      })
      Address.belongsTo(models.States, {
        foreignKey: {
          allowNull: false,
          name: 'state_id'
        }
      })

      Address.belongsTo(models.Streets, {
        foreignKey: {
          allowNull: false,
          name: 'street_id'
        }
      })
    }
  }

  Address.init(
    {
      id: {
        type: DataTypes.INTEGER,
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
      state_id: {
        type: DataTypes.MEDIUMINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'states',
          key: 'id'
        }
      },
      city_id: {
        type: DataTypes.MEDIUMINT.UNSIGNED,
        allowNull: false,

        references: {
          model: 'cities',
          key: 'id'
        }
      },
      street_id: {
        type: DataTypes.MEDIUMINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'streets',
          key: 'id'
        }
      }
    },

    {
      sequelize,
      modelName: 'Addresses',
      tableName: 'addresses',
      underscored: true
    }
  )

  return Address
}
