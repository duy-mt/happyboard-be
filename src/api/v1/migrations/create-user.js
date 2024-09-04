'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        email: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING(60),
            allowNull: false
        },
        username: {
            type: Sequelize.STRING(50),
            defaultValue: 'user'
        },
        avatar: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        phone: {
            type: Sequelize.STRING(10),
            defaultValue: ''
        },
        status: {
            type: Sequelize.ENUM('active', 'pending', 'block'),
            defaultValue: 'active'
        },
        isOnline: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        jobPosition: {
            type: Sequelize.TEXT,
            defaultValue: ''
        },
        introduce: {
            type: Sequelize.TEXT,
            defaultValue: ''
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        deletedAt: {
            allowNull: true,
            type: Sequelize.DATE
        }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users');
    }
}