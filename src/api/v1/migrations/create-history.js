'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('histories', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        type: {
            type: Sequelize.STRING(4),
            allowNull: false
        },
        userTargetId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        objectTargetId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        objectTargetLv2Id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        contentIdea: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        contentComment: {
            type: Sequelize.TEXT,
            allowNull: true,
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
        await queryInterface.dropTable('histories');
    }
}