'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Role_Feature extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }
    Role_Feature.init({
        roleId: DataTypes.INTEGER,
        featureId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Role_Feature',
        timestamps: true,
    })
    return Role_Feature
}
