import { Sequelize, Model } from 'sequelize'

export interface AddressTypeInterface {
  id: number
  name: string
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class AddressType extends Model<AddressTypeInterface> implements AddressTypeInterface {
    id!: number
    name!: string

    // static associate(models: any): void {
    // Employee.belongsToMany(models.EmployeesTenant, {
    //   through: 'employees_tenant',
    //   onDelete: 'CASCADE'
    // })
    // AddressType.belongsTo(models.People, {})
    // }
  }

  AddressType.init(
    {
      id: {
        type: DataTypes.SMALLINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    },

    {
      sequelize,
      modelName: 'AddressTypes',
      tableName: 'address_types'
    }
  )

  return AddressType
}
