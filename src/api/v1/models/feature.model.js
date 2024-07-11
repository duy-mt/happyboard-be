'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Feature extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }
    Feature.init({
        name: DataTypes.STRING(20),
        description: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Feature',
        timestamps: true,
    })
    return Feature
}
