'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Role_Feature', [
      // Admin
      { roleId: 1, featureId: 1, createdAt: new Date(), updatedAt: new Date() },
      { roleId: 1, featureId: 2, createdAt: new Date(), updatedAt: new Date() },
      { roleId: 1, featureId: 3, createdAt: new Date(), updatedAt: new Date() },
      { roleId: 1, featureId: 4, createdAt: new Date(), updatedAt: new Date() },
      { roleId: 1, featureId: 5, createdAt: new Date(), updatedAt: new Date() },
      { roleId: 1, featureId: 6, createdAt: new Date(), updatedAt: new Date() },
      { roleId: 1, featureId: 7, createdAt: new Date(), updatedAt: new Date() },
      { roleId: 1, featureId: 8, createdAt: new Date(), updatedAt: new Date() },
      { roleId: 1, featureId: 9, createdAt: new Date(), updatedAt: new Date() },
      { roleId: 1, featureId: 10, createdAt: new Date(), updatedAt: new Date() },

      // Moderator
      { roleId: 2, featureId: 1, createdAt: new Date(), updatedAt: new Date() },
      { roleId: 2, featureId: 2, createdAt: new Date(), updatedAt: new Date() },
      { roleId: 2, featureId: 3, createdAt: new Date(), updatedAt: new Date() },
      { roleId: 2, featureId: 4, createdAt: new Date(), updatedAt: new Date() },
      { roleId: 2, featureId: 5, createdAt: new Date(), updatedAt: new Date() },
      { roleId: 2, featureId: 6, createdAt: new Date(), updatedAt: new Date() },
      { roleId: 2, featureId: 7, createdAt: new Date(), updatedAt: new Date() },
      { roleId: 2, featureId: 8, createdAt: new Date(), updatedAt: new Date() },
      { roleId: 2, featureId: 9, createdAt: new Date(), updatedAt: new Date() },

      // User
      { roleId: 3, featureId: 1, createdAt: new Date(), updatedAt: new Date() },
      { roleId: 3, featureId: 2, createdAt: new Date(), updatedAt: new Date() },
      { roleId: 3, featureId: 3, createdAt: new Date(), updatedAt: new Date() },
      { roleId: 3, featureId: 6, createdAt: new Date(), updatedAt: new Date() },
      { roleId: 3, featureId: 7, createdAt: new Date(), updatedAt: new Date() },
      { roleId: 3, featureId: 8, createdAt: new Date(), updatedAt: new Date() },
      { roleId: 3, featureId: 9, createdAt: new Date(), updatedAt: new Date() },
      { roleId: 3, featureId: 10, createdAt: new Date(), updatedAt: new Date() },

      // Guest
      { roleId: 4, featureId: 10, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Role_Feature', null, {});
  }
};
