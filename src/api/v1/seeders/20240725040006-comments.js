'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkInsert('comments', [
    //   {
    //     content: 'Ý tưởng rất hay!',
    //     userId: 1,
    //     ideaId: 1,
    //     parentId: null,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     content: 'Cần phải có kế hoạch cụ thể',
    //     userId: 2,
    //     ideaId: 2,
    //     parentId: null,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     content: 'Tôi hoàn toàn đồng ý với bạn',
    //     userId: 3,
    //     ideaId: 3,
    //     parentId: null,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     content: 'Chúng ta cần hành động ngay bây giờ',
    //     userId: 1,
    //     ideaId: 4,
    //     parentId: null,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     content: 'Hoàn toàn đồng ý với bạn. Chúng ta cần hành động ngay bây giờ',
    //     userId: 2,
    //     ideaId: 4,
    //     parentId: 4,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   }
    // ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('comments', null, {});
  }
};
