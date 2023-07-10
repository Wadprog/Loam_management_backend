import { Sequelize, Model } from 'sequelize'

export interface EmployeesTenantInterface {
  salary: number
  active: boolean
  role_id: number
  username: string
  password: string
  tenant_id: number
  employee_id: number
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class EmployeesTenant extends Model<EmployeesTenantInterface> implements EmployeesTenantInterface {
    tenant_id!: number
    role_id!: number
    employee_id!: number
    salary!: number
    username!: string
    password!: string
    active!: boolean

    static associate(models: any): void {
      EmployeesTenant.belongsTo(models.Tenants)
      EmployeesTenant.belongsTo(models.Employees)
      EmployeesTenant.belongsTo(models.RolesTenant)
    }
  }

  EmployeesTenant.init(
    {
      active: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      salary: {
        allowNull: false,
        type: DataTypes.DOUBLE
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'roles_tenant',
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
