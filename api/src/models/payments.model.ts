import { Sequelize, Model } from 'sequelize'

export interface PaymentInterface {
  id: number
  amount_paid: number
  payment_method_id: number
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class Payment extends Model<PaymentInterface> implements PaymentInterface {
    id!: number
    amount_paid!: number
    payment_method_id!: number
  }

  Payment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      payment_method_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'payment_methods',
          key: 'id'
        }
      },
      amount_paid: {
        type: DataTypes.DOUBLE(10, 2)
      }
    },

    {
      sequelize,
      underscored: true,
      modelName: 'Payments',
      tableName: 'payments'
    }
  )

  return Payment
}
