import { Sequelize, Model } from 'sequelize'

export interface AddressesUserInterface {
  id: number
  address_id: number
  person_id: number
  address_type_id: number
  date_address_from: Date
  date_address_to: Date
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class AddressesUser extends Model<AddressesUserInterface> implements AddressesUserInterface {
    id!: number
    person_id!: number
    address_id!: number
    address_type_id!: number
    date_address_from!: Date
    date_address_to!: Date

    // static associate(models: any): void {
    // Employee.belongsToMany(models.EmployeesTenant, {
    //   through: 'employees_tenant',
    //   onDelete: 'CASCADE'
    // })
    // AddressUser.belongsTo(models.People, {})
    // }
  }

  AddressesUser.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'addresses',
          key: 'id'
        }
      },
      person_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'people',
          key: 'id'
        }
      },
      address_type_id: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false,

        references: {
          model: 'address_types',
          key: 'id'
        }
      },
      date_address_from: {
        type: DataTypes.DATE,
        allowNull: false
      },
      date_address_to: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },

    {
      sequelize,
      modelName: 'AddressesUser',
      tableName: 'addresses_user'
    }
  )

  return AddressesUser
}
