'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'admin@example.com',
        password: '$2a$10$GyqMakjEG34Jjn76BKQk8eFVwiW1aECKdq4TfVcTZMl6Ph6J0mJEq', // hashed password: 'password123'
        username: 'Admin',
        avatar: '',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'moderator@example.com',
        password: '$2a$10$GyqMakjEG34Jjn76BKQk8eFVwiW1aECKdq4TfVcTZMl6Ph6J0mJEq', // hashed password: 'password123'
        username: 'Moderator',
        avatar: '',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user1@example.com',
        password: '$2a$10$GyqMakjEG34Jjn76BKQk8eFVwiW1aECKdq4TfVcTZMl6Ph6J0mJEq', // hashed password: 'password123'
        username: 'John',
        avatar: '',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user2@example.com',
        password: '$2a$10$GyqMakjEG34Jjn76BKQk8eFVwiW1aECKdq4TfVcTZMl6Ph6J0mJEq', // hashed password: 'password123'
        username: 'Jane',
        avatar: '',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'guest@example.com',
        password: '$2a$10$GyqMakjEG34Jjn76BKQk8eFVwiW1aECKdq4TfVcTZMl6Ph6J0mJEq', // hashed password: 'password123'
        username: 'Guest',
        avatar: '',
        status: 'block',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    await queryInterface.bulkInsert('Tokens', [
      {
        userId: 1,
        accessToken: '',
        refreshToken: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        accessToken: '',
        refreshToken: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        accessToken: '',
        refreshToken: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 4,
        accessToken: '',
        refreshToken: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 5,
        accessToken: '',
        refreshToken: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
