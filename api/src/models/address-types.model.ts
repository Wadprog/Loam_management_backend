import { Sequelize, Model } from 'sequelize'

export interface AddressTypeInterface {
  id: number
  name: string
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class AddressType extends Model<AddressTypeInterface> implements AddressTypeInterface {
    id!: number
    name!: string

    static associate(models: any): void {
      AddressType.hasMany(models.AddressesUser, {
        foreignKey: {
          name: 'address_type_id',
          allowNull: false
        },
        onUpdate: 'CASCADE'
      })
    }
  }

  AddressType.init(
    {
      id: {
        type: DataTypes.SMALLINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    },

    {
      sequelize,
      modelName: 'AddressTypes',
      tableName: 'address_types',
      underscored: true
    }
  )

  return AddressType
}
