'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkInsert('votes', [
    //   {
    //     userId: 1,
    //     ideaId: 1,
    //     status: 1,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     userId: 2,
    //     ideaId: 2,
    //     status: 1,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     userId: 3,
    //     ideaId: 3,
    //     status: 1,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     userId: 1,
    //     ideaId: 4,
    //     status: 1,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     userId: 2,
    //     ideaId: 4,
    //     status: 1,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   }
    // ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('votes', null, {});
  }
};
