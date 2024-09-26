'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('ideas', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            categoryId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            voteCount: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            viewCount: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            commentCount: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            isPublished: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            isDrafted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
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
            type: {
                type: Sequelize.ENUM('text', 'link', 'image'),
                defaultValue: 'text',
            },
            linkUrl: {
                allowNull: true,
                type: Sequelize.TEXT
            },
            linkImage: {
                allowNull: true,
                type: Sequelize.TEXT
            } 
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('ideas')
    },
}
