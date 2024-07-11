'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Ideas', [
      {
        title: 'First Idea',
        content: 'This is the content of the first idea.',
        userId: 1,
        categoryId: 1,
        voteCount: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Second Idea',
        content: 'This is the content of the second idea.',
        userId: 2,
        categoryId: 2,
        voteCount: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Third Idea',
        content: 'This is the content of the third idea.',
        userId: 3,
        categoryId: 3,
        voteCount: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Fourth Idea',
        content: 'This is the content of the fourth idea.',
        userId: 4,
        categoryId: 4,
        voteCount: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Fifth Idea',
        content: 'This is the content of the fifth idea.',
        userId: 5,
        categoryId: 5,
        voteCount: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ideas', null, {});
  }
};
