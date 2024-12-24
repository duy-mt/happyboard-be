'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('polls', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            categoryId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            groupId: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            voteCount: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            viewCount: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            isPublished: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            commentCount: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            question: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            startDate: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            remindTime: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            endDate: {
                type: Sequelize.DATE,
                allowNull: true,
            }, 
            isActive: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            deletedAt: {
                allowNull: true,
                type: Sequelize.DATE,
            },
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('polls')
    },
}
