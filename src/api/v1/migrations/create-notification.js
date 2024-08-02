'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('notifications', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        from: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        to: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        target: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        status: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('notifications');
    }
}