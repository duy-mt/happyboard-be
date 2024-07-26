'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        email: 'admin@example.com',
        password: '$2a$10$GyqMakjEG34Jjn76BKQk8eFVwiW1aECKdq4TfVcTZMl6Ph6J0mJEq', // password123
        username: 'Admin User',
        avatar: 'https://example.com/admin.png',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'john.doe@example.com',
        password: '$2a$10$GyqMakjEG34Jjn76BKQk8eFVwiW1aECKdq4TfVcTZMl6Ph6J0mJEq',
        username: 'John Doe',
        avatar: 'https://example.com/john.png',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'jane.doe@example.com',
        password: '$2a$10$GyqMakjEG34Jjn76BKQk8eFVwiW1aECKdq4TfVcTZMl6Ph6J0mJEq',
        username: 'Jane Doe',
        avatar: 'https://example.com/jane.png',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'peter.pan@example.com',
        password: '$2a$10$GyqMakjEG34Jjn76BKQk8eFVwiW1aECKdq4TfVcTZMl6Ph6J0mJEq',
        username: 'Peter Pan',
        avatar: 'https://example.com/peter.png',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
