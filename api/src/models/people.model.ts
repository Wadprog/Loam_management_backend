// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, Model } from 'sequelize'

export interface PersonInterface {
  id: number
  given_name: string
  familly_name: string
  tenant_id: number
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class Person extends Model<PersonInterface> implements PersonInterface {
    // eslint-disable-next-line prettier/prettier
    id!: number
    tenant_id!: number
    given_name!: string
    familly_name!: string

    // static associate(models: any): void {
    //   Person.hasMany(models.Addresses, {
    //     onUpdate: 'CASCADE'
    //   })
    //   Person.hasMany(models.Phones, {
    //     onUpdate: 'CASCADE'
    //   })
    // }
  }

  Person.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      given_name: {
        type: DataTypes.STRING,
        allowNull: false
      },

      familly_name: {
        type: DataTypes.STRING,
        allowNull: false
      },

      tenant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'tenants',
          key: 'id'
        }
      }
    },

    {
      sequelize,
      underscored: true,
      modelName: 'People',
      tableName: 'people'
    }
  )

  return Person
}
