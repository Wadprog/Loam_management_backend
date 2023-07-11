import { Sequelize, Model } from 'sequelize'

export interface ContractsInterface {
  id: number
  name: string
  media_id: number
  tenant_id: number
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class Contracts extends Model<ContractsInterface> implements ContractsInterface {
    id!: number
    name!: string
    media_id!: number
    tenant_id!: number

    // static associate(models: any): void {
    // Contracts.hasMany(models.Loans, {})
    // Contracts.belongsTo(models.People, {
    //   foreignKey: {
    //     allowNull: false
    //   },
    //   constraints: true
    // }) // is a person
    // Contracts.hasMany(models.Colaterals, {})
    // Borrower.hasMany(models.BorrowersTenant, {
    //   foreignKey: {
    //     allowNull: false
    //   }
    // }) // belongs to many organizations
    // }
  }

  Contracts.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      tenant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'tenants',
          key: 'id'
        }
      },
      media_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'medias',
          key: 'id'
        }
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 0
      }
    },

    {
      sequelize,
      modelName: 'Contracts',
      tableName: 'contracts',
      underscored: true
    }
  )

  return Contracts
}
