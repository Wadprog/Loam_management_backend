import { Sequelize, Model } from 'sequelize'

export interface SettingsTenantInterface {
  id: number
  employee_id: number
  setting_id: number
  tenant_id: number
  action: string
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class SettingsHistory extends Model<SettingsTenantInterface> implements SettingsTenantInterface {
    id!: number
    tenant_id!: number
    employee_id!: number
    setting_id!: number
    action!: string

    static associate(models: any): void {
      SettingsHistory.belongsTo(models.Settings, {
        foreignKey: {
          allowNull: false,
          name: 'setting_id'
        },
        constraints: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      SettingsHistory.belongsTo(models.Tenants, {
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

  SettingsHistory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'id'
        }
      },
      action: {
        type: DataTypes.STRING(10),
        validate: {
          isIn: [['add', 'remove']]
        },
        allowNull: false
      },
      setting_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'settings',
          key: 'id'
        }
      },

      tenant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'tenants',
          key: 'id'
        }
      }
    },

    {
      sequelize,
      modelName: 'SettingHistory',
      tableName: 'setting_history',
      underscored: true
    }
  )

  return SettingsHistory
}
