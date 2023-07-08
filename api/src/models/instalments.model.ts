// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, Model } from 'sequelize'

export interface InstalmentInterface {
  id: string
  amount: number
  status: string
  maturity_date: Date
  debt_balance: number
  interest_balance: number
  paid_date: Date
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class Instalment extends Model<InstalmentInterface> implements InstalmentInterface {
    // eslint-disable-next-line prettier/prettier
    id!: string
    amount!: number
    status!: string
    maturity_date!: Date
    debt_balance!: number
    interest_balance!: number
    paid_date!: Date

    static associate(models: any): void {
      Instalment.belongsTo(models.Loans, {
        onDelete: 'CASCADE'
      })
    }
  }

  Instalment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      maturity_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      paid_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      debt_balance: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
      },
      interest_balance: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
      },

      status: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: true,
        validate: {
          isIn: [['paid', 'unpaid', 'overdue', 'waived']]
        }
      }
    },

    {
      sequelize,
      modelName: 'Instalments',
      tableName: 'instalments',
      underscored: true
    }
  )

  return Instalment
}
