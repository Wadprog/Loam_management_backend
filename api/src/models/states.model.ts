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

    // static associate(models: any): void {
    // Employee.belongsToMany(models.EmployeesTenant, {
    //   through: 'employees_tenant',
    //   onDelete: 'CASCADE'
    // })
    // State.belongsTo(models.People, {})
    // }
  }

  State.init(
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
      country_id: {
        type: DataTypes.MEDIUMINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'countries',
          key: 'id'
        }
      }
    },

    {
      sequelize,
      modelName: 'States',
      tableName: 'states'
    }
  )

  return State
}
