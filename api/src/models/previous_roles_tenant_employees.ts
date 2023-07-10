// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, Model } from 'sequelize'

export interface PreviousRolesInterface {
  id: number
  tenant_id: number
  employee_id: number
  new_role_id: number
  authorizer_id: number
  previous_role_id: number
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class PreviousRoles extends Model<PreviousRolesInterface> implements PreviousRolesInterface {
    id!: number
    tenant_id!: number
    employee_id!: number
    new_role_id!: number
    authorizer_id!: number
    previous_role_id!: number

    static associate(models: any): void {
      // PreviousRoles.belongsTo(models.Customer, {})
      // PreviousRoles.belongsTo(models.PreviousRoles, {})
    }
  }

  PreviousRoles.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      tenant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'tenants',
          key: 'id'
        }
      },
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'id'
        }
      },
      new_role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id'
        }
      },

      authorizer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'id'
        }
      },
      previous_role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id'
        }
      }
    },

    {
      sequelize,
      modelName: 'People',
      tableName: 'people'
    }
  )

  return PreviousRoles
}
