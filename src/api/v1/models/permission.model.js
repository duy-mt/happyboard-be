'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Permission extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {}
    }
    Permission.init(
        {
            name: DataTypes.STRING(20),
            description: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'Permission',
            tableName: 'permissions',
            timestamps: true,
        },
    )
    return Permission
}
