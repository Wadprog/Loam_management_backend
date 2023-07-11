import { Sequelize, Model } from 'sequelize'

export interface TagsServiceInterface {
  tag_id: number
  tagger_id: number
  service_id: number
  service_name: string
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class TagsService extends Model<TagsServiceInterface> implements TagsServiceInterface {
    tag_id!: number
    tagger_id!: number
    service_id!: number
    service_name!: string

    // static associate(models: any): void {}
  }

  TagsService.init(
    {
      tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'tags',
          key: 'id'
        }
      },
      tagger_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'employees',
          key: 'id'
        }
      },
      service_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },

      service_name: {
        type: DataTypes.STRING(20),
        allowNull: false
      }
    },

    {
      sequelize,
      modelName: 'TagsService',
      tableName: 'tags_service',
      underscored: true
    }
  )

  return TagsService
}
