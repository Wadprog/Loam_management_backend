import { Sequelize, Model } from 'sequelize'

export interface ContractsLoanInterface {
  loan_id: number
  contract_id: number
  signed: boolean
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class ContractsLoan extends Model<ContractsLoanInterface> implements ContractsLoanInterface {
    loan_id!: number
    signed!: boolean
    contract_id!: number

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

  ContractsLoan.init(
    {
      contract_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        references: {
          model: 'contracts',
          key: 'id'
        }
      },
      loan_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'loan',
          key: 'id'
        }
      },

      signed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },

    {
      sequelize,
      modelName: 'ContractsLoan',
      tableName: 'contracts_loan',
      underscored: true
    }
  )

  return ContractsLoan
}
