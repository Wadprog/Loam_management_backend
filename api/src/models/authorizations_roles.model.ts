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
      AuthorizationsRole.belongsTo(models.Roles, {
        foreignKey: {
          allowNull: false,
          name: 'role_id'
        },
        constraints: true
      })
      AuthorizationsRole.belongsTo(models.Authorizations, {
        foreignKey: {
          allowNull: false,
          name: 'authorization_id'
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
      createdAt: false,
      updatedAt: false,
      tableName: 'authorizations_role',
      underscored: true
    }
  )

  return AuthorizationsRole
}
