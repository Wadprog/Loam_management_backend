// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, Model } from 'sequelize'

export interface DiscountInterface {
  id: number
  code: string
  description: string
  percentage: number
  start_date: Date
  end_date: Date
  valid: boolean
  reocurring: boolean
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class Discount extends Model<DiscountInterface> implements DiscountInterface {
    id!: number
    code!: string
    description!: string
    percentage!: number
    start_date!: Date
    end_date!: Date
    valid!: boolean
    reocurring!: boolean

    static associate(models: any): void {
      // PreviousRoles.belongsTo(models.Customer, {})
      // PreviousRoles.belongsTo(models.PreviousRoles, {})
    }
  }

  Discount.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      code: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      percentage: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: true
      },
      valid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      reocurring: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    },

    {
      sequelize,
      underscored: true,
      modelName: 'Discounts',
      tableName: 'discounts'
    }
  )

  return Discount
}
