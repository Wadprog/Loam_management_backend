// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, Model } from 'sequelize'

export interface EmployeeInterface {
  id: string
  active: boolean
  username: string
  password: string
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class Employee extends Model<EmployeeInterface> implements EmployeeInterface {
    // eslint-disable-next-line prettier/prettier

    id!: string

    name!: string

    active!: boolean

    username!: string

    password!: string

    static associate(models: any): void {
      // Employee.belongsToMany(models.EmployeesTenant, {
      //   through: 'employees_tenant',
      //   onDelete: 'CASCADE'
      // })
      Employee.belongsTo(models.People, {})
    }
  }

  Employee.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      username: {
        type: DataTypes.STRING,
        allowNull: false
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false
      },

      active: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      }
    },

    {
      sequelize,
      modelName: 'Employees',
      tableName: 'employees'
    }
  )

  return Employee
}
