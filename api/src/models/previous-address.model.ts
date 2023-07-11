import { Sequelize, Model } from 'sequelize'

export interface AlteredAddressNotificationInterface {
  id: number
  to_notify_tenant_id: number
  status: string
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class AlteredAddressNotifications
    extends Model<AlteredAddressNotificationInterface>
    implements AlteredAddressNotificationInterface
  {
    id!: number
    to_notify_tenant_id!: number
    status!: string

    // static associate(models: any): void {
    // Employee.belongsToMany(models.EmployeesTenant, {
    //   through: 'employees_tenant',
    //   onDelete: 'CASCADE'
    // })
    // AddressUser.belongsTo(models.People, {})
    // }
  }

  AlteredAddressNotifications.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      to_notify_tenant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'addresses',
          key: 'id'
        }
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['sent', 'read', 'updated', 'ignored']]
        }
      }
    },

    {
      sequelize,
      modelName: 'PreviousAddress',
      tableName: 'previous_address'
    }
  )

  return AlteredAddressNotifications
}
