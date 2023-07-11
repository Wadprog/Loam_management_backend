import { Sequelize, Model } from 'sequelize'

export interface CountryInterface {
  id: number
  name: string
  phone_code: string
  currency: string
  currency_symbol: string
  curency_name: string
  translations: string
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class Country extends Model<CountryInterface> implements CountryInterface {
    id!: number
    name!: string
    currency!: string
    phone_code!: string
    curency_name!: string
    translations!: string
    currency_symbol!: string

    static associate(models: any): void {
      // Employee.belongsToMany(models.EmployeesTenant, {
      //   through: 'employees_tenant',
      //   onDelete: 'CASCADE'
      // })
      Country.belongsTo(models.People, {})
    }
  }

  Country.init(
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
      phone_code: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      currency: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      currency_symbol: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      curency_name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      translations: {
        type: DataTypes.TEXT
      }
    },

    {
      sequelize,
      modelName: 'Countries',
      tableName: 'countries'
    }
  )

  return Country
}
