'use strict'

const { Model, BOOLEAN, ENUM } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Poll_option extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Poll, {
                foreignKey: 'pollId',
                as: 'poll'
            })
        }
    }
    Poll_option.init(
        {
            pollId: DataTypes.INTEGER,
            optionText: DataTypes.STRING,
            votes: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: 'Poll_option',
            tableName: 'poll_options',
            // timestamps: true,
            paranoid: true,
        },
    )
    return Poll_option
}
