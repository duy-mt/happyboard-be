'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [
      {
        name: 'Admin',
        description: 'Full access to all features and settings.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Moderator',
        description: 'Can manage user content and handle reports.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'User',
        description: 'Standard user with access to regular features.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Guest',
        description: 'Limited access to view-only features.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
