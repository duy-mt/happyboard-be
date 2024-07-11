'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Role_Feature', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        roleId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        featureId: {
            type: Sequelize.INTEGER,
            allowNull: false
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
        await queryInterface.dropTable('Role_Feature');
    }
}