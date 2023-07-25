import { Sequelize, Model } from 'sequelize'

export interface TagsTenantInterface {
  tag_id: number
  tenant_id: number
  description: string
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class TagsTenant extends Model<TagsTenantInterface> implements TagsTenantInterface {
    tag_id!: number
    tenant_id!: number
    description!: string

    // static associate(models: any): void {}
  }

  TagsTenant.init(
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

      tenant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'tenants',
          key: 'id'
        }
      },

      description: {
        type: DataTypes.STRING(255),
        allowNull: false
      }
    },

    {
      sequelize,
      modelName: 'TagsTenant',
      tableName: 'tags_tenant',
      underscored: true
    }
  )

  return TagsTenant
}
