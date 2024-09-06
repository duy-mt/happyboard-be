'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // await queryInterface.bulkInsert('notifications', [
        //   {
        //     type: 'NI01',
        //     from: 1,
        //     to: 1,
        //     target: 1,
        //     status: 10,
        //     createdAt: new Date(),
        //     updatedAt: new Date()
        //   },
        // ], {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
}
