'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('categories', [
      {
        title: 'Work',
        description: 'Ideas related to work',
        icon: 'fa-laptop',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Entertainment',
        description: 'Ideas related to entertainment',
        icon: 'fa-icons',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Food',
        description: 'Ideas related to cuisine',
        icon: 'fa-burger',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Sport',
        description: 'Ideas related to sports',
        icon: 'fa-futbol',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Technique',
        description: 'Ideas related to technology',
        icon: 'fa-compass-drafting',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
