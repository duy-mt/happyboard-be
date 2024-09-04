'use strict'

const { Model, BOOLEAN } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Idea extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.Comment, {
                foreignKey: 'ideaId',
                as: 'comments'
            })

            this.hasMany(models.Vote, {
                foreignKey: 'ideaId',
                as: 'vote'
            })

            this.belongsTo(models.User, {
                foreignKey: 'userId'
            })

            this.belongsTo(models.Category, {
                foreignKey: 'categoryId'
            })
        }
    }
    Idea.init({
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
        userId: DataTypes.INTEGER,
        categoryId: DataTypes.INTEGER,
        isPublished: DataTypes.BOOLEAN,
        isDrafted: DataTypes.BOOLEAN,
        voteCount: DataTypes.INTEGER,
        commentCount: DataTypes.INTEGER,
        viewCount: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Idea',
        tableName: 'ideas',
        // timestamps: true,
        paranoid: true,
    })
    return Idea
}
