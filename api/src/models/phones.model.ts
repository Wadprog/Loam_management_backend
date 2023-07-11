// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, Model } from 'sequelize'

export interface PhoneInterface {
  id: string
  ext: string
  code: string
  number: string
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class Phone extends Model<PhoneInterface> implements PhoneInterface {
    id!: string
    ext!: string
    code!: string
    number!: string

    // static associate(models: any): void {
    // Person.belongsTo(models.Customer, {})
    // Person.belongsTo(models.Person, {})
    // }
  }

  Phone.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      number: {
        type: DataTypes.STRING(20),
        allowNull: false
      },

      code: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      ext: {
        type: DataTypes.STRING(15),
        allowNull: true
      }
    },

    {
      sequelize,
      modelName: 'Phones',
      tableName: 'phones'
    }
  )

  return Phone
}
