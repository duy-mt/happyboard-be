'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('permissions', [
      {
        name: 'create user',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'read all users',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'read user',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'update user',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'delete user',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('permissions', null, {});
  }
};
