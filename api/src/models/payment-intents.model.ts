import { Sequelize, Model } from 'sequelize'

export interface PaymentIntentInterface {
  subscription_id: number
  payment_intent_id: string
  status: string
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class PaymentIntent extends Model<PaymentIntentInterface> implements PaymentIntentInterface {
    subscription_id!: number
    payment_intent_id!: string
    status!: string

    static associate(models: any): void {
      PaymentIntent.belongsTo(models.Subscriptions, {
        onUpdate: 'CASCADE',
        foreignKey: {
          name: 'subscription_id',
          allowNull: false
        }
      })
    }
  }

  PaymentIntent.init(
    {
      payment_intent_id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'incompleted',
        validate: {
          isIn: [['incompleted', 'canceled', 'completed']]
        }
      },
      subscription_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'subscriptions',
          key: 'id'
        }
      }
    },

    {
      sequelize,
      underscored: true,
      modelName: 'PaymentIntents',
      tableName: 'payment_intents',
      indexes: [
        {
          name: 'payment_intents_subscription_id_index',
          fields: ['subscription_id']
        }
      ]
    }
  )

  return PaymentIntent
}
