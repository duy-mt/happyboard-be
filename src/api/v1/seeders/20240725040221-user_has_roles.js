'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user_has_roles', [
      {
        userId: 1,
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 4,
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 5,
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_has_roles', null, {});
  }
};
