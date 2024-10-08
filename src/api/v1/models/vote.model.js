'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Vote extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {}
    }
    Vote.init(
        {
            userId: DataTypes.INTEGER,
            ideaId: DataTypes.INTEGER,
            status: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Vote',
            tableName: 'votes',
            timestamps: true,
            paranoid: true,
        },
    )
    return Vote
}
