import { Sequelize, Model } from 'sequelize'

export interface SubscriptionInterface {
  id: number
  tenant_id: number
  plan_id: number
  discount_id: number
  status: string
  start_date: Date
  end_date: Date
  price_paid: number
  period: string
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class Subscription extends Model<SubscriptionInterface> implements SubscriptionInterface {
    id!: number
    tenant_id!: number
    plan_id!: number
    discount_id!: number
    status!: string
    start_date!: Date
    end_date!: Date
    price_paid!: number
    period!: string
  }

  Subscription.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      tenant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'tenants',
          key: 'id'
        }
      },
      plan_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'plans',
          key: 'id'
        }
      },
      discount_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'discounts',
          key: 'id'
        }
      },
      status: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'active',
        validate: {
          isIn: [['active', 'inactive', 'unpaid', 'canceled', 'expired']]
        }
      },
      price_paid: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
      },
      period: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          isIn: [['monthly', 'yearly']]
        }
      },
      start_date: {
        allowNull: true,
        type: DataTypes.DATE
      },
      end_date: {
        allowNull: true,
        type: DataTypes.DATE
      }
    },

    {
      sequelize,
      underscored: true,
      modelName: 'Subscriptions',
      tableName: 'subscriptions'
    }
  )

  return Subscription
}
