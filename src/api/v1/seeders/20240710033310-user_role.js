'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('User_Role', [
      { userId: 1, roleId: 1, createdAt: new Date(), updatedAt: new Date() }, // Admin
      { userId: 2, roleId: 2, createdAt: new Date(), updatedAt: new Date() }, // Moderator
      { userId: 3, roleId: 3, createdAt: new Date(), updatedAt: new Date() }, // User
      { userId: 4, roleId: 3, createdAt: new Date(), updatedAt: new Date() }, // User
      { userId: 5, roleId: 4, createdAt: new Date(), updatedAt: new Date() }, // Guest
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User_Role', null, {});
  }
};
