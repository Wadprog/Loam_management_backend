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

    // static associate(models: any): void {
    // Employee.belongsToMany(models.EmployeesTenant, {
    //   through: 'employees_tenant',
    //   onDelete: 'CASCADE'
    // })
    // City.belongsTo(models.People, {})
    // }
  }

  City.init(
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
      state_id: {
        type: DataTypes.MEDIUMINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'states',
          key: 'id'
        }
      }
    },

    {
      sequelize,
      modelName: 'Cities',
      tableName: 'cities'
    }
  )

  return City
}
