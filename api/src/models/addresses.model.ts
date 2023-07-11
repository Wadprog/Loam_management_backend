import { Sequelize, Model } from 'sequelize'

export interface AddressInterface {
  id: number
  city_id: string
  state_id: string
  street_id: string
  country_id: string
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class Address extends Model<AddressInterface> implements AddressInterface {
    id!: number
    city_id!: string
    state_id!: string
    street_id!: string
    country_id!: string

    // static associate(models: any): void {
    // Employee.belongsToMany(models.EmployeesTenant, {
    //   through: 'employees_tenant',
    //   onDelete: 'CASCADE'
    // })
    // Address.belongsTo(models.People, {})
    // }
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
      tableName: 'addresses'
    }
  )

  return Address
}
