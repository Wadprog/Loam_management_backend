import { Sequelize, Model } from 'sequelize'

export interface SettingsTenantInterface {
  setting_id: number
  tenant_id: number
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class SettingsTenant extends Model<SettingsTenantInterface> implements SettingsTenantInterface {
    setting_id!: number
    tenant_id!: number

    static associate(models: any): void {
      SettingsTenant.belongsTo(models.Settings, {
        foreignKey: {
          allowNull: false,
          name: 'setting_id'
        },
        constraints: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      SettingsTenant.belongsTo(models.Tenants, {
        foreignKey: {
          allowNull: false,
          name: 'tenant_id'
        },
        constraints: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }

  SettingsTenant.init(
    {
      setting_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'settings',
          key: 'id'
        }
      },

      tenant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'tenants',
          key: 'id'
        }
      }
    },

    {
      sequelize,
      modelName: 'SettingsTenant',
      createdAt: false,
      updatedAt: false,
      tableName: 'settings_tenant',
      underscored: true
    }
  )

  return SettingsTenant
}
