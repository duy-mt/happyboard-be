'use strict'

const { Model, BOOLEAN, ENUM } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Poll_response extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Poll, {
                foreignKey: 'pollId',
                as: 'polls',
            })
            this.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'users',
            })
            this.belongsTo(models.Poll_option, {
                foreignKey: 'pollOptionId',
                as: 'options'
            })
        }
    }
    Poll_response.init(
        {
            pollId: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
            pollOptionId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Poll_response',
            tableName: 'poll_responses',
            // timestamps: true,
            paranoid: true,
        },
    )
    return Poll_response
}
