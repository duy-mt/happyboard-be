'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Notification extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.User, {
                as: 'fromUser',
                foreignKey: 'from',
            })
            this.belongsTo(models.User, {
                as: 'toUser',
                foreignKey: 'to',
            })
        }
    }
    Notification.init(
        {
            type: DataTypes.STRING,
            from: DataTypes.INTEGER,
            to: DataTypes.INTEGER,
            target: DataTypes.INTEGER,
            status: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Notification',
            tableName: 'notifications',
            // timestamps: true,
            paranoid: true,
        },
    )
    return Notification
}
