'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', [
      {
        content: 'This is the first comment on the first idea.',
        userId: 2,
        ideaId: 1,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'This is the second comment on the first idea.',
        userId: 3,
        ideaId: 1,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'This is a reply to the first comment on the first idea.',
        userId: 1,
        ideaId: 1,
        parentId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'This is the first comment on the second idea.',
        userId: 4,
        ideaId: 2,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'This is the first comment on the third idea.',
        userId: 5,
        ideaId: 3,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
