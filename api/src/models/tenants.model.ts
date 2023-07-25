import { Model } from 'sequelize'

export interface TenantInterface {
  id: number
  name: string
  active: boolean
  // plan_id: number
  // plan_period: string
}

export default (sequelize: any, DataTypes: any) => {
  class Tenant extends Model<TenantInterface> implements TenantInterface {
    id!: number
    name!: string
    active!: boolean
    // plan_id!: number
    // plan_period!: string

    static associate(models: any): void {
      Tenant.hasMany(models.Employees, {
        onDelete: 'CASCADE'
      })

      Tenant.hasMany(models.BorrowersTenant, {
        onDelete: 'CASCADE'
      })
    }
  }

  Tenant.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING(200)
      },

      active: {
        allowNull: false,
        defaultValue: true,
        type: DataTypes.BOOLEAN
      }
      // plan_id: {
      //   allowNull: false,
      //   type: DataTypes.INTEGER,
      //   references: {
      //     model: 'plans',
      //     key: 'id'
      //   }
      // },
      // plan_period: {
      //   allowNull: false,
      //   type: DataTypes.STRING(20),
      //   validate: {
      //     isIn: [['monthly', 'yearly']]
      //   },
      //   defaultValue: 'monthly'
      // }
    },

    {
      sequelize,
      underscored: true,
      modelName: 'Tenants',
      tableName: 'tenants'
    }
  )

  return Tenant
}
