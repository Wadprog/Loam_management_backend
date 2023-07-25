import { Sequelize, Model } from 'sequelize'

export interface PreviousRolesInterface {
  id: number
  role_id: number
  tenant_id: number
  modifier_id: number
  new_role_name: string
  previous_role_name: number
  new_role_description: string
  previous_role_description: string
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class PreviousRoles extends Model<PreviousRolesInterface> implements PreviousRolesInterface {
    id!: number
    role_id!: number
    tenant_id!: number
    modifier_id!: number
    new_role_name!: string
    previous_role_name!: number
    new_role_description!: string
    previous_role_description!: string

    // static associate(models: any): void {
    // PreviousRoles.belongsTo(models.Customer, {})
    // PreviousRoles.belongsTo(models.PreviousRoles, {})
    // }
  }

  PreviousRoles.init(
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
      new_role_name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      new_role_description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      previous_role_name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      previous_role_description: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },

    {
      sequelize,
      underscored: true,
      modelName: 'PRoles',
      tableName: 'p_roles'
    }
  )

  return PreviousRoles
}
