import { Sequelize, Model } from 'sequelize'

export interface FraudLogInterface {
  id: number
  tenant_id: number
  employee_id: number
  action: string
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class FraudLog extends Model<FraudLogInterface> implements FraudLogInterface {
    id!: number
    tenant_id!: number
    employee_id!: number
    action!: string

    // static associate(models: any): void {
    //   FraudLog.belongsTo(models.Tenants, {
    //     foreignKey: {
    //       allowNull: false,
    //       name: 'tenant_id'
    //     },
    //     constraints: true
    //   })
    //   EmployeesTenant.belongsTo(models.RolesTenant, {
    //     foreignKey: {
    //       allowNull: false,
    //       name: 'role_id'
    //     },
    //     constraints: true
    //   })
    // }
  }

  FraudLog.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      tenant_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'tenants',
          key: 'id'
        }
      },

      employee_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'tenants',
          key: 'id'
        }
      },
      action: {
        allowNull: false,
        type: DataTypes.STRING(10),
        validate: {
          isIn: [['add', 'remove', 'modify']]
        }
      }
    },

    {
      sequelize,
      modelName: 'FraudLogs',
      tableName: 'fraud_logs',
      underscored: true
    }
  )

  return FraudLog
}
