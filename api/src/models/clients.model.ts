// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Model } from 'sequelize'

export interface CustomerInterface {
  id: string
  name: string
  active: boolean
}

export default (sequelize: any, DataTypes: any) => {
  class Customer extends Model<CustomerInterface> implements CustomerInterface {
    // eslint-disable-next-line prettier/prettier

    id!: string

    name!: string

    active!: boolean

    static associate(models: any): void {
      // Friend.hasOne(models.User, { as: 'Requester' })
      // Friend.hasOne(models.User, { as: 'User' })
    }
  }

  Customer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        primaryKey: true
      },

      active: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      }
    },

    {
      sequelize,
      modelName: 'customers'
    }
  )

  return Customer
}
