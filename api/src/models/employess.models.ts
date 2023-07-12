import { Sequelize, Model } from 'sequelize'

export interface EmployeesTenantInterface {
  id: number
  salary: number
  active: boolean
  role_id: number
  username: string
  password: string
  tenant_id: number
  person_id: number
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class EmployeesTenant extends Model<EmployeesTenantInterface> implements EmployeesTenantInterface {
    id!: number
    tenant_id!: number
    role_id!: number
    salary!: number
    person_id!: number
    username!: string
    password!: string
    active!: boolean

    static associate(models: any): void {
      EmployeesTenant.belongsTo(models.Tenants)
      EmployeesTenant.belongsTo(models.RolesTenant)
    }
  }

  EmployeesTenant.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
      person_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'people',
          key: 'id'
        }
      }
    },

    {
      sequelize,
      modelName: 'Employees',
      tableName: 'employees',
      underscored: true
    }
  )

  return EmployeesTenant
}
