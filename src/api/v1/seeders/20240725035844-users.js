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
        isOnline: false,
        jobPosition: 'Intent MyFPT',
        introduce: 'A dedicated and eager software development intern with a passion for learning and building effective backend systems. Driven by curiosity and a commitment to excellence, they focus on honing their skills and contributing to impactful projects.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'thangvb2@example.com',
        password: '$2a$10$GyqMakjEG34Jjn76BKQk8eFVwiW1aECKdq4TfVcTZMl6Ph6J0mJEq',
        username: 'Thang Vu Ba',
        avatar: '',
        status: 'active',
        isOnline: false,
        jobPosition: 'Intent MyFPT',
        introduce: 'A dedicated and eager software development intern with a passion for learning and building effective backend systems. Driven by curiosity and a commitment to excellence, they focus on honing their skills and contributing to impactful projects.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'khaipn2@example.com',
        password: '$2a$10$GyqMakjEG34Jjn76BKQk8eFVwiW1aECKdq4TfVcTZMl6Ph6J0mJEq',
        username: 'Khai Phan Ngoc',
        avatar: '',
        status: 'active',
        isOnline: false,
        jobPosition: 'Intent MyFPT',
        introduce: 'A dedicated and eager software development intern with a passion for learning and building effective backend systems. Driven by curiosity and a commitment to excellence, they focus on honing their skills and contributing to impactful projects.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'duymt3@example.com',
        password: '$2a$10$GyqMakjEG34Jjn76BKQk8eFVwiW1aECKdq4TfVcTZMl6Ph6J0mJEq',
        username: 'Duy Mai Tran',
        avatar: '',
        status: 'active',
        isOnline: false,
        jobPosition: 'Intent MyFPT',
        introduce: 'A dedicated and eager software development intern with a passion for learning and building effective backend systems. Driven by curiosity and a commitment to excellence, they focus on honing their skills and contributing to impactful projects.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'hungld23@example.com',
        password: '$2a$10$GyqMakjEG34Jjn76BKQk8eFVwiW1aECKdq4TfVcTZMl6Ph6J0mJEq',
        username: 'Hung La Duc',
        avatar: '',
        status: 'active',
        isOnline: false,
        jobPosition: 'Intent MyFPT',
        introduce: 'A dedicated and eager software development intern with a passion for learning and building effective backend systems. Driven by curiosity and a commitment to excellence, they focus on honing their skills and contributing to impactful projects.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
