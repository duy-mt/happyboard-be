'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'categories',
            [
                {
                    title: 'Chọn quà tết 2024',
                    description: 'Ideas related to life',
                    icon: 'fa-icons',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Nâng cấp cơ sở vật chất',
                    description: 'Ideas related to entertainment',
                    icon: 'fa-compass-drafting',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Trưa nay ăn gì?',
                    description: 'Ideas related to cuisine',
                    icon: 'fa-burger',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Thể thao nâng cao sức khỏe',
                    description: 'Ideas related to sports',
                    icon: 'fa-futbol',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Học hỏi công nghệ',
                    description: 'Ideas related to technology',
                    icon: 'fa-compass-drafting',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Xu hướng làm việc từ xa',
                    description: 'Ideas related to remote work trends',
                    icon: 'fa-laptop-house',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Tối ưu năng lượng tái tạo',
                    description: 'Ideas related to renewable energy',
                    icon: 'fa-solar-panel',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Sức khỏe tinh thần',
                    description: 'Ideas related to mental health',
                    icon: 'fa-brain',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {},
        )
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('categories', null, {})
    },
}
