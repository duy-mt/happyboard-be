'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Group extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            
            this.belongsToMany(models.User, {
                through: models.User_has_groups,
                foreignKey: 'groupId',
                otherKey: 'userId',
                as: 'users',
            });

            // this.hasMany(models.Idea, {
            //     foreignKey: 'Gro',
            //     as: 'ideas',
            // })
        }
    }
    Group.init(
        {
            name: DataTypes.STRING(100),
            description: DataTypes.TEXT,
            avatar: DataTypes.STRING,
            background: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Group',
            tableName: 'groups',
            // timestamps: true,
            paranoid: true,
        },
    )
    return Group
}
