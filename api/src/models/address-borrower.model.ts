import { Sequelize, Model } from 'sequelize'

export interface AddressBorrowerInterface {
  id: number
  address_id: number
  borrower_id: number
  tenant_id: number
  address_type_id: number
  date_address_from: Date
  date_address_to: Date
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class AddressBorrower extends Model<AddressBorrowerInterface> implements AddressBorrowerInterface {
    id!: number
    tenant_id!: number
    borrower_id!: number
    address_id!: number
    address_type_id!: number
    date_address_from!: Date
    date_address_to!: Date

    static associate(models: any): void {
      AddressBorrower.belongsTo(models.Tenants, {
        foreignKey: {
          allowNull: false,
          name: 'tenant_id'
        }
      })

      AddressBorrower.belongsTo(models.Borrowers, {
        foreignKey: {
          allowNull: false,
          name: 'borrower_id'
        }
      })

      AddressBorrower.belongsTo(models.Addresses, {
        foreignKey: {
          allowNull: false,
          name: 'address_id'
        }
      })

      AddressBorrower.belongsTo(models.AddressTypes, {
        foreignKey: {
          allowNull: false,
          name: 'address_type_id'
        }
      })
      // Employee.belongsToMany(models.EmployeesTenant, {
      //   through: 'employees_tenant',
      //   onDelete: 'CASCADE'
      // })
      // AddressUser.belongsTo(models.People, {})
    }
  }

  AddressBorrower.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'addresses',
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
      tenant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'tenants',
          key: 'id'
        }
      },
      address_type_id: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false,

        references: {
          model: 'address_types',
          key: 'id'
        }
      },
      date_address_from: {
        type: DataTypes.DATE,
        allowNull: false
      },
      date_address_to: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },

    {
      sequelize,
      modelName: 'AddressesBorrower',
      tableName: 'addresses_borrower',
      underscored: true
    }
  )

  return AddressBorrower
}
