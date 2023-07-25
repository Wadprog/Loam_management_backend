import { Sequelize, Model } from 'sequelize'

export interface RolesInterface {
  id: number
  title: string
  custom: boolean
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class Roles extends Model<RolesInterface> implements RolesInterface {
    id!: number
    title!: string
    custom!: boolean

    // static associate(models: any): void {}
  }

  Roles.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },

      title: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      custom: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },

    {
      sequelize,
      modelName: 'Roles',
      tableName: 'roles',
      underscored: true
    }
  )

  return Roles
}
