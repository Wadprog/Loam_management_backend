// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, Model } from 'sequelize'

export interface PlanInterface {
  id: number
  name: string
  description: string
  yearly_price: number
  monthly_price: number
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class Plan extends Model<PlanInterface> implements PlanInterface {
    id!: number
    name!: string
    description!: string
    yearly_price!: number
    monthly_price!: number

    static associate(models: any): void {
      Plan.hasMany(models.FeaturesPlan, {
        foreignKey: 'plan_id'
      })
    }
  }

  Plan.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      yearly_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0
      },

      monthly_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0
      }
    },

    {
      sequelize,
      underscored: true,
      modelName: 'Plans',
      tableName: 'plans'
    }
  )

  return Plan
}
