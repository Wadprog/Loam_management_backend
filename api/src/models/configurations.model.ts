import { Sequelize, Model } from 'sequelize'

export interface ConfigurationInterface {
  id: number
  tenant_id: number
  setting_id: number
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class Configuration extends Model<ConfigurationInterface> implements ConfigurationInterface {
    id!: number
    tenant_id!: number
    setting_id!: number
  }

  Configuration.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },

      tenant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'tenants',
          key: 'id'
        }
      },
      setting_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'settings',
          key: 'id'
        }
      }
    },

    {
      sequelize,
      modelName: 'Configurations',
      tableName: 'configurations',
      underscored: true
    }
  )

  return Configuration
}
