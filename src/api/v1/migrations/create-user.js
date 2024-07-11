'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
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
        firstName: {
            type: Sequelize.STRING(50),
            defaultValue: ''
        },
        lastName: {
            type: Sequelize.STRING(50),
            defaultValue: ''
        },
        avatar: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        status: {
            type: Sequelize.ENUM('active', 'pending', 'block'),
            defaultValue: 'pending'
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users');
    }
}