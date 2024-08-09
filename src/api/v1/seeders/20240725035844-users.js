'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        email: 'admin@example.com',
        password: '$2a$10$GyqMakjEG34Jjn76BKQk8eFVwiW1aECKdq4TfVcTZMl6Ph6J0mJEq', // password123
        username: 'Administrator',
        avatar: '',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'thangvb2@example.com',
        password: '$2a$10$GyqMakjEG34Jjn76BKQk8eFVwiW1aECKdq4TfVcTZMl6Ph6J0mJEq',
        username: 'Thang Vu Ba',
        avatar: '',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'khaipn2@example.com',
        password: '$2a$10$GyqMakjEG34Jjn76BKQk8eFVwiW1aECKdq4TfVcTZMl6Ph6J0mJEq',
        username: 'Khai Phan Ngoc',
        avatar: '',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'duymt3@example.com',
        password: '$2a$10$GyqMakjEG34Jjn76BKQk8eFVwiW1aECKdq4TfVcTZMl6Ph6J0mJEq',
        username: 'Duy Mai Tran',
        avatar: '',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'hungld23@example.com',
        password: '$2a$10$GyqMakjEG34Jjn76BKQk8eFVwiW1aECKdq4TfVcTZMl6Ph6J0mJEq',
        username: 'Hung La Duc',
        avatar: '',
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
