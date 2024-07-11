'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Idea, {
                foreignKey: 'ideaId',
                as: 'idea'
            });
        }
    }
    Comment.init({
        content: DataTypes.TEXT,
        userId: DataTypes.INTEGER,
        ideaId: DataTypes.INTEGER,
        parentId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Comment',
        timestamps: true,
    })
    return Comment
}
