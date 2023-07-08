// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Model } from 'sequelize'

export interface MediaInterface {
  id: string
  url: string
}

export default (sequelize: any, DataTypes: any) => {
  class Media extends Model<MediaInterface> implements MediaInterface {
    // eslint-disable-next-line prettier/prettier

    id!: string
    url!: string

    static associate(models: any): void {
      Media.belongsToMany(models.Colaterals, { through: 'colaterals_media' })
    }
  }

  Media.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      url: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true
        }
      }
    },

    {
      sequelize,
      modelName: 'Medias',
      tableName: 'medias'
    }
  )

  return Media
}
