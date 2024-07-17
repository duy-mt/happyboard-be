'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Categories', [
            {
                title: 'Technology',
                description: 'All about the latest tech trends and innovations.',
                icon: 'icon',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Health',
                description: 'Health tips, news, and advice.',
                icon: 'icon',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Travel',
                description: 'Travel guides, tips, and destination reviews.',
                icon: 'icon',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Food',
                description: 'Delicious recipes, restaurant reviews, and cooking tips.',
                icon: 'icon',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Education',
                description: 'Resources and news about education and learning.',
                icon: 'icon',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Finance',
                description: 'Financial advice, news, and tips on saving money.',
                icon: 'icon',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Entertainment',
                description: 'Latest entertainment news and celebrity gossip.',
                icon: 'icon',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Sports',
                description: 'Sports news, scores, and analysis.',
                icon: 'icon',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Fashion',
                description: 'Latest trends in fashion and style tips.',
                icon: 'icon',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Science',
                description: 'Discoveries and news from the world of science.',
                icon: 'icon',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Categories', null, {});
    }
}
