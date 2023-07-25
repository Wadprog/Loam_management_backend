// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, Model } from 'sequelize'

export interface DiscountPeriodInterface {
  id: number
  description: string
  from_date: Date
  end_date: Date
  valid: boolean
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class DiscountPeriod extends Model<DiscountPeriodInterface> implements DiscountPeriodInterface {
    id!: number
    description!: string
    percentage!: number
    from_date!: Date
    end_date!: Date
    valid!: boolean

    static associate(models: any): void {
      // PreviousRoles.belongsTo(models.Customer, {})
      // PreviousRoles.belongsTo(models.PreviousRoles, {})
    }
  }

  DiscountPeriod.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },

      from_date: {
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
      }
    },

    {
      sequelize,
      underscored: true,
      modelName: 'DiscountPeriods',
      tableName: 'discount_periods'
    }
  )

  return DiscountPeriod
}
