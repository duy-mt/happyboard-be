'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ideas', [
      {
        title: 'Phát triển ứng dụng học tiếng Anh',
        content: 'Ứng dụng học tiếng Anh dựa trên trí tuệ nhân tạo',
        userId: 1,
        categoryId: 1,
        voteCount: 1,
        commentCount: 1,
        viewCount: 10,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Nâng cao chất lượng giáo dục đại học',
        content: 'Cải cách chương trình đào tạo, nâng cao chất lượng giảng dạy',
        userId: 2,
        categoryId: 2,
        voteCount: 1,
        commentCount: 1,
        viewCount: 10,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Xây dựng bệnh viện thông minh',
        content: 'Ứng dụng công nghệ thông tin trong quản lý và khám chữa bệnh',
        userId: 1,
        categoryId: 3,
        voteCount: 1,
        commentCount: 1,
        viewCount: 10,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Bảo vệ môi trường biển',
        content: 'Giảm thiểu rác thải nhựa, bảo vệ đa dạng sinh học biển',
        userId: 3,
        categoryId: 4,
        voteCount: 2,
        commentCount: 2,
        viewCount: 10,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ideas', null, {});
  }
};
