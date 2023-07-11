import { Sequelize, Model } from 'sequelize'

export interface TagsInterface {
  id: number
  name: string
  custom: boolean
  description: string
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class Tags extends Model<TagsInterface> implements TagsInterface {
    id!: number
    name!: string
    custom!: boolean
    description!: string

    // static associate(models: any): void {}
  }

  Tags.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },

      name: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(255),
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
      modelName: 'Tags',
      tableName: 'tags',
      underscored: true
    }
  )

  return Tags
}
