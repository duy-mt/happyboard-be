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
                foreignKey: 'pollId',
                as: 'options',
            })
            this.hasMany(models.Poll_response, {
                foreignKey: 'pollId',
                as: 'responses',
            })
        }
    }
    Poll.init(
        {
            ideaId: DataTypes.INTEGER,
            isActive: DataTypes.BOOLEAN,
            endDate: DataTypes.DATE,
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
