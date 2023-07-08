// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, Model } from 'sequelize'

export interface PersonInterface {
  id: string
  given_name: string
  familly_name: string
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class Person extends Model<PersonInterface> implements PersonInterface {
    // eslint-disable-next-line prettier/prettier

    id!: string

    name!: string

    familly_name!: string

    given_name!: string

    static associate(models: any): void {
      // Person.belongsTo(models.Customer, {})
      // Person.belongsTo(models.Person, {})
    }
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
      }
    },

    {
      sequelize,
      modelName: 'People',
      tableName: 'people'
    }
  )

  return Person
}
