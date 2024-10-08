'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {}
    }
    User.init(
        {
            email: DataTypes.STRING(50),
            password: DataTypes.STRING(60),
            username: DataTypes.STRING(50),
            avatar: DataTypes.STRING,
            phone: DataTypes.STRING(10),
            status: DataTypes.ENUM('active', 'pending', 'block'),
            isOnline: DataTypes.BOOLEAN,
            jobPosition: DataTypes.TEXT,
            introduce: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            // timestamps: true,
            paranoid: true,
        },
    )
    return User
}
