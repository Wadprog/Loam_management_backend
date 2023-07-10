import { Sequelize, Model } from 'sequelize'

export interface AuthorizationsRoleInterface {
  role_id: number
  authorization_id: number
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class AuthorizationsRole extends Model<AuthorizationsRoleInterface> implements AuthorizationsRoleInterface {
    role_id!: number
    authorization_id!: number

    static associate(models: any): void {
      AuthorizationsRole.belongsTo(models.AuthorizationsRole, {
        foreignKey: {
          allowNull: false
        },
        constraints: true
      })
      AuthorizationsRole.belongsTo(models.Tenants, {
        foreignKey: {
          allowNull: false
        },
        constraints: true
      })
    }
  }

  AuthorizationsRole.init(
    {
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'roles',
          key: 'id'
        }
      },
      authorization_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'authorizations',
          key: 'id'
        }
      }
    },

    {
      sequelize,
      modelName: 'AuthorizationsRole',
      tableName: 'authorizations_role',
      underscored: true
    }
  )

  return AuthorizationsRole
}
