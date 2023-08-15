// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, Model } from 'sequelize'

export interface FeatureInterface {
  id: number
  name: string
  status: string
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class Feature extends Model<FeatureInterface> implements FeatureInterface {
    id!: number
    name!: string
    status!: string

    static associate(models: any): void {
      Feature.hasMany(models.FeaturesPlan, {
        foreignKey: 'feature_id'
      })
    }
  }

  Feature.init(
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
      status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'supported',
        validate: {
          isIn: [
            ['supported', 'deprecated', 'removed', 'beta', 'alpha', 'in-development', 'testing', 'requested']
          ]
        }
      }
    },

    {
      sequelize,
      underscored: true,
      modelName: 'Features',
      tableName: 'features'
    }
  )

  return Feature
}
