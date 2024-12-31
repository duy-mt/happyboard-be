'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class User_has_groups extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user',
            })

            this.belongsTo(models.Group, {
                foreignKey: 'groupId',
                as: 'group',
            })

        }
    }
    User_has_groups.init(
        {
            userId: DataTypes.INTEGER,
            groupId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'User_has_groups',
            tableName: 'user_has_groups',
            timestamps: true,
        },
    )
    return User_has_groups
}
