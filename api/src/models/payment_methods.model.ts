import { Sequelize, Model } from 'sequelize'

export interface PaymentMethodInterface {
  id: number
  name: number
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class PaymentMethod extends Model<PaymentMethodInterface> implements PaymentMethodInterface {
    id!: number
    name!: number
  }

  PaymentMethod.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(50)
      }
    },

    {
      sequelize,
      underscored: true,
      modelName: 'PaymentMethods',
      tableName: 'payment_methods'
    }
  )

  return PaymentMethod
}
