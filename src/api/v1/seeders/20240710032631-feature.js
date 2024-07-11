'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Features', [
      {
        name: 'Login',
        description: 'Allows users to log into their accounts.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Register',
        description: 'Allows new users to create an account.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Create Post',
        description: 'Enables users to create new posts.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Edit Post',
        description: 'Allows users to edit their own posts.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Delete Post',
        description: 'Allows users to delete their own posts.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Comment',
        description: 'Enables users to comment on posts.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Like Post',
        description: 'Allows users to like posts.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Follow User',
        description: 'Enables users to follow other users.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Share Post',
        description: 'Allows users to share posts.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Search',
        description: 'Enables users to search for posts and users.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Features', null, {});
  }
};
