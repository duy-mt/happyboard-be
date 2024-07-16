'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }
    User.init({
        email: DataTypes.STRING(50),
        password: DataTypes.STRING(60),
        username: DataTypes.STRING(50),
        avatar: DataTypes.STRING(50),
        status: DataTypes.ENUM('active', 'pending', 'block'),
    }, {
        sequelize,
        modelName: 'User',
        timestamps: true,
    })
    return User
}
