'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkInsert('tokens', [
    //   {
    //     userId: 1,
    //     refreshToken: 'refresh-token-1',
    //     accessToken: 'access-token-1',
    //     deviceToken: 'device-token-1',
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     userId: 2,
    //     refreshToken: 'refresh-token-2',
    //     accessToken: 'access-token-2',
    //     deviceToken: 'device-token-2',
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     userId: 3,
    //     refreshToken: 'refresh-token-3',
    //     accessToken: 'access-token-3',
    //     deviceToken: 'device-token-3',
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     userId: 4,
    //     refreshToken: 'refresh-token-4',
    //     accessToken: 'access-token-4',
    //     deviceToken: 'device-token-4',
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   }
    // ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tokens', null, {});
  }
};
