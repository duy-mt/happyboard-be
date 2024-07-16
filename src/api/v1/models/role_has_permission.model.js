'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Role_has_permissions extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }
    Role_has_permissions.init({
        roleId: DataTypes.INTEGER,
        permissionId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Role_has_permissions',
        timestamps: true,
    })
    return Role_has_permissions
}
