// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, Model } from 'sequelize'

export interface PhoneTypesInterface {
  id: string
  name: string
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class PhoneType extends Model<PhoneTypesInterface> implements PhoneTypesInterface {
    id!: string
    name!: string

    // static associate(models: any): void {
    // Person.belongsTo(models.Customer, {})
    // Person.belongsTo(models.Person, {})
    // }
  }

  PhoneType.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
      }
    },

    {
      sequelize,
      modelName: 'PhoneTypes',
      tableName: 'phone_types'
    }
  )

  return PhoneType
}
