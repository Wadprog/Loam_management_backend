import { Sequelize, Model } from 'sequelize'

export interface SettingInterface {
  id: number
  title: string
  allow_action: string
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class Setting extends Model<SettingInterface> implements SettingInterface {
    id!: number
    title!: string
    allow_action!: string

    // static associate(models: any): void {}
  }

  Setting.init(
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
      allow_action: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },

    {
      sequelize,
      modelName: 'Settings',
      tableName: 'settings',
      underscored: true
    }
  )

  return Setting
}
