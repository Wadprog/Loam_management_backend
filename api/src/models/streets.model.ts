import { Sequelize, Model } from 'sequelize'

export interface StreetInterface {
  id: number
  name: string
  city_id: number
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class Street extends Model<StreetInterface> implements StreetInterface {
    id!: number
    name!: string
    city_id!: number

    // static associate(models: any): void {
    // Employee.belongsToMany(models.EmployeesTenant, {
    //   through: 'employees_tenant',
    //   onDelete: 'CASCADE'
    // })
    // Street.belongsTo(models.People, {})
    // }
  }

  Street.init(
    {
      id: {
        type: DataTypes.MEDIUMINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      city_id: {
        type: DataTypes.MEDIUMINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'cities',
          key: 'id'
        }
      }
    },

    {
      sequelize,
      modelName: 'Streets',
      tableName: 'streets'
    }
  )

  return Street
}
