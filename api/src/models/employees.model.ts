import { Sequelize, Model } from 'sequelize'

export interface EmployeeInterface {
  id: string
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class Employee extends Model<EmployeeInterface> implements EmployeeInterface {
    // eslint-disable-next-line prettier/prettier

    id!: string

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
