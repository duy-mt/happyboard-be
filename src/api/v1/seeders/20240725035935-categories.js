'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('categories', [
      {
        title: 'Công nghệ',
        description: 'Những ý tưởng liên quan đến công nghệ',
        icon: 'icon',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Giáo dục',
        description: 'Những ý tưởng liên quan đến giáo dục',
        icon: 'icon',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Y tế',
        description: 'Những ý tưởng liên quan đến y tế',
        icon: 'icon',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Môi trường',
        description: 'Những ý tưởng liên quan đến môi trường',
        icon: 'icon',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
