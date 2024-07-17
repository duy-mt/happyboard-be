'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Reaction extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }
    Reaction.init({
        name: DataTypes.STRING(20),
        userId: DataTypes.INTEGER,
        commentId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Reaction',
        tableName: 'reactions',
        timestamps: true,
    })
    return Reaction
}
