import { Model } from 'sequelize'

export interface TenantInterface {
  id: number
  name: string
  active: boolean
}

export default (sequelize: any, DataTypes: any) => {
  class Tenant extends Model<TenantInterface> implements TenantInterface {
    id!: number
    name!: string
    active!: boolean

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
    },

    {
      sequelize,
      modelName: 'Tenants',
      tableName: 'tenants'
    }
  )

  return Tenant
}
