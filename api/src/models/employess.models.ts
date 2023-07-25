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
  is_primary: boolean
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
    is_primary!: boolean

    static associate(models: any): void {
      EmployeesTenant.belongsTo(models.Tenants, {
        foreignKey: {
          allowNull: false,
          name: 'tenant_id'
        },
        constraints: true
      })
      EmployeesTenant.belongsTo(models.RolesTenant, {
        foreignKey: {
          allowNull: false,
          name: 'role_id'
        },
        constraints: true
      })
    }
  }

  EmployeesTenant.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
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
      },
      is_primary: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
