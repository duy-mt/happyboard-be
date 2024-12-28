'use strict'

const { Model, BOOLEAN, ENUM } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Poll extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Idea, {
                foreignKey: 'ideaId',
            })

            this.hasMany(models.Poll_option, {
                foreignKey: "pollId"
            })
        }
    }
    Poll.init(
        {
            ideaId: DataTypes.INTEGER,
            isActive: DataTypes.BOOLEAN,
            expireHour: DataTypes.INTEGER,
            remindBeforeExpireTime: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Poll',
            tableName: 'polls',
            // timestamps: true,
            paranoid: true,
        },
    )
    return Poll
}
