// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, Model } from 'sequelize'

export interface PhonesUserInterface {
  id: number
  phone_id: number
  user_id: number
  phone_type_id: number
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class PhoneUser extends Model<PhonesUserInterface> implements PhonesUserInterface {
    id!: number
    phone_id!: number
    user_id!: number
    phone_type_id!: number

    // static associate(models: any): void {
    // Person.belongsTo(models.Customer, {})
    // Person.belongsTo(models.Person, {})
    // }
  }

  PhoneUser.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      phone_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'phones',
          key: 'id'
        }
      },

      phone_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'phone_types',
          key: 'id'
        }
      }
    },

    {
      sequelize,
      modelName: 'PhonesUser',
      tableName: 'phones_user'
    }
  )

  return PhoneUser
}
