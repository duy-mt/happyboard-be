'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class User_has_roles extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }
    User_has_roles.init({
        roleId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'User_has_roles',
        tableName: 'user_has_roles',
        timestamps: true,
    })
    return User_has_roles
}
