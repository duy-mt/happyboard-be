'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class History extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.User, {
                foreignKey: 'userId',
            })

            this.belongsTo(models.User, {
                foreignKey: 'userTargetId',
            })
        }
    }
    History.init(
        {
            userId: DataTypes.INTEGER,
            type: DataTypes.STRING(4),
            userTargetId: DataTypes.INTEGER,
            objectTargetId: DataTypes.INTEGER,
            objectTargetLv2Id: DataTypes.INTEGER,
            contentIdea: DataTypes.TEXT,
            contentComment: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'History',
            tableName: 'histories',
            timestamps: true,
        },
    )
    return History
}
