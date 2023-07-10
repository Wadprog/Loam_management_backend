import { Sequelize, Model } from 'sequelize'

export interface EmployeesTenantInterface {
  tenant_id: number
  employee_id: number
  salary: number
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class EmployeesTenant extends Model<EmployeesTenantInterface> implements EmployeesTenantInterface {
    tenant_id!: number
    employee_id!: number
    salary!: number

    static associate(models: any): void {
      EmployeesTenant.belongsTo(models.Employees)
      EmployeesTenant.belongsTo(models.Tenants)
    }
  }

  EmployeesTenant.init(
    {
      salary: {
        allowNull: false,
        type: DataTypes.DOUBLE
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
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'employees',
          key: 'id'
        }
      }
    },

    {
      sequelize,
      modelName: 'EmployeesTenant',
      tableName: 'employees_tenant',
      underscored: true
    }
  )

  return EmployeesTenant
}
