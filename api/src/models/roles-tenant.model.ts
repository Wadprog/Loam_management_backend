import { Sequelize, Model } from 'sequelize'

export interface RolesTenantInterface {
  id: number
  name: string
  role_id: number
  tenant_id: number
  description: string
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class RolesTenant extends Model<RolesTenantInterface> implements RolesTenantInterface {
    id!: number
    name!: string
    role_id!: number
    tenant_id!: number
    description!: string

    static associate(models: any): void {
      RolesTenant.belongsTo(models.Tenants, {
        foreignKey: {
          allowNull: false
        },
        constraints: true
      })
    }
  }

  RolesTenant.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
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
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'roles',
          key: 'id'
        }
      },

      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },

    {
      sequelize,
      modelName: 'RolesTenant',
      tableName: 'roles_tenant',
      underscored: true
    }
  )

  return RolesTenant
}
