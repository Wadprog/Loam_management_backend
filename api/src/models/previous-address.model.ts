import { Sequelize, Model } from 'sequelize'

export interface AlteredAddressNotificationInterface {
  id: number
  tenant_id: number
  employee_id: number
  borrower_id: number
  old_address_id: number
  new_address_id: number
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class PreviousAddress
    extends Model<AlteredAddressNotificationInterface>
    implements AlteredAddressNotificationInterface
  {
    id!: number
    tenant_id!: number
    employee_id!: number
    borrower_id!: number
    old_address_id!: number
    new_address_id!: number

    static associate(models: any): void {
      PreviousAddress.belongsTo(models.Tenants, {
        foreignKey: {
          allowNull: false,
          name: 'tenant_id'
        }
      })
      PreviousAddress.belongsTo(models.Borrowers, {
        foreignKey: {
          allowNull: false,
          name: 'borrower_id'
        }
      })
      PreviousAddress.belongsTo(models.Employees, {
        foreignKey: {
          allowNull: false,
          name: 'employee_id'
        }
      })
    }
  }

  PreviousAddress.init(
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

      borrower_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'borrowers',
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
      old_address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'addresses',
          key: 'id'
        }
      },
      new_address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'addresses',
          key: 'id'
        }
      }
    },

    {
      sequelize,
      modelName: 'PreviousAddress',
      tableName: 'previous_address'
    }
  )

  return PreviousAddress
}
