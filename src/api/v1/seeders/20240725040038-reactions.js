'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkInsert('reactions', [
    //   {
    //     name: 'like',
    //     userId: 1,
    //     commentId: 1,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     name: 'love',
    //     userId: 2,
    //     commentId: 2,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     name: 'haha',
    //     userId: 3,
    //     commentId: 3,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     name: 'wow',
    //     userId: 1,
    //     commentId: 4,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   }
    // ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('reactions', null, {});
  }
};
