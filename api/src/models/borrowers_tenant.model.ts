import { Sequelize, Model } from 'sequelize'

export interface BorrowersTenantInterface {
  score: number
  tenant_id: number
  borrower_id: number
  amount_loans: number
  amount_active_loans: number
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class BorrowersTenant extends Model<BorrowersTenantInterface> implements BorrowersTenantInterface {
    score!: number
    tenant_id!: number
    borrower_id!: number
    amount_loans!: number
    amount_active_loans!: number

    static associate(models: any): void {
      BorrowersTenant.belongsTo(models.Borrowers, {
        foreignKey: {
          allowNull: false
        },
        constraints: true
      })
      BorrowersTenant.belongsTo(models.Tenants, {
        foreignKey: {
          allowNull: false
        },
        constraints: true
      })
    }
  }

  BorrowersTenant.init(
    {
      tenant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'tenants',
          key: 'id'
        }
      },
      borrower_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'borrowers',
          key: 'id'
        }
      },
      score: {
        allowNull: false,
        defaultValue: 0,
        type: DataTypes.SMALLINT.UNSIGNED
      },
      amount_loans: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
      },
      amount_active_loans: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
      }
    },

    {
      sequelize,
      modelName: 'BorrowersTenant',
      tableName: 'borrower_tenant',
      underscored: true
    }
  )

  return BorrowersTenant
}
