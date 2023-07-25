// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, Model } from 'sequelize'
import { FeaturesPlan } from '../services/features-plan/features-plan.class'

export interface FeaturesPlanInterface {
  plan_id: number
  feature_id: number
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class FeaturesPlan extends Model<FeaturesPlanInterface> implements FeaturesPlanInterface {
    plan_id!: number
    feature_id!: number

    static associate(models: any): void {
      FeaturesPlan.belongsTo(models.Plans, {
        foreignKey: {
          name: 'plan_id',
          allowNull: false
        },
        constraints: true
      })
      FeaturesPlan.belongsTo(models.Features, {
        foreignKey: {
          name: 'feature_id',
          allowNull: false
        },
        constraints: true
      })
    }
  }

  FeaturesPlan.init(
    {
      feature_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'features',
          key: 'id'
        }
      },
      plan_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'plans',
          key: 'id'
        }
      }
    },

    {
      sequelize,
      underscored: true,
      modelName: 'FeaturesPlan',
      tableName: 'features_plan'
    }
  )

  return FeaturesPlan
}
