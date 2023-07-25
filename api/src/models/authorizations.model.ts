import { Sequelize, Model } from 'sequelize'

export interface AuthorizationsInterface {
  id: number
  role_details: string
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class Authorization extends Model<AuthorizationsInterface> implements AuthorizationsInterface {
    id!: number
    role_details!: string

    // static associate(models: any): void {}
  }

  Authorization.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },

      role_details: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true,
          in: [['CAN_CREATE_BORROWER', 'CAN_CREATE_EMPLOYEES', 'CAN_CREATE_PAYMENT']]
        }
      }
    },

    {
      sequelize,
      modelName: 'Authorizations',
      tableName: 'authorizations',
      underscored: true
    }
  )

  return Authorization
}
