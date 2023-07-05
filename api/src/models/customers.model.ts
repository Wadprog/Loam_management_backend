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
      Customer.hasMany(models.Employees, {
        onDelete: 'CASCADE'
      })
      Customer.hasMany(models.Borrowers, {
        onDelete: 'CASCADE'
      })
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
        type: DataTypes.STRING
      },

      active: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      }
    },

    {
      sequelize,
      modelName: 'Customers',
      tableName: 'customers'
    }
  )

  return Customer
}
