import { Sequelize, Model } from 'sequelize'

export interface CommentsInterface {
  id: number
  text: string
  service_id: number
  service_name: string
  commentor_id: number
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class Comments extends Model<CommentsInterface> implements CommentsInterface {
    id!: number
    text!: string
    service_id!: number
    service_name!: string
    commentor_id!: number

    // static associate(models: any): void {}
  }

  Comments.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      service_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      service_name: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      commentor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'employees',
          key: 'id'
        }
      },

      text: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },

    {
      sequelize,
      modelName: 'Comments',
      tableName: 'comments',
      underscored: true
    }
  )

  return Comments
}
