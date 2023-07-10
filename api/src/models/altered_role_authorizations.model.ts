import { Sequelize, Model } from 'sequelize'

export interface AlteredRolesAuthorizationsInterface {
  id: number
  action: string
  role_id: number
  tenant_id: number
  modifier_id: number
  authorization_id: number
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class AlteredRolesAuthorizations
    extends Model<AlteredRolesAuthorizationsInterface>
    implements AlteredRolesAuthorizationsInterface
  {
    id!: number
    action!: string
    role_id!: number
    tenant_id!: number
    modifier_id!: number
    authorization_id!: number

    // static associate(models: any): void {
    // AlteredRolesAuthorizations.belongsTo(models.Customer, {})
    // AlteredRolesAuthorizations.belongsTo(models.AlteredRolesAuthorizations, {})
    // }
  }

  AlteredRolesAuthorizations.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
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
      },
      modifier_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'id'
        }
      },
      authorization_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'authorizations',
          key: 'id'
        }
      },

      action: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          isIn: [['added', 'removed']]
        }
      }
    },

    {
      sequelize,
      modelName: 'AlteredRolesAuthorizations',
      tableName: 'altered_roles_authorizations'
    }
  )

  return AlteredRolesAuthorizations
}
