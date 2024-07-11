'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Categories', [
            {
                title: 'Technology',
                description: 'All about the latest tech trends and innovations.',
                color: 'blue',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Health',
                description: 'Health tips, news, and advice.',
                color: 'green',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Travel',
                description: 'Travel guides, tips, and destination reviews.',
                color: 'orange',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Food',
                description: 'Delicious recipes, restaurant reviews, and cooking tips.',
                color: 'red',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Education',
                description: 'Resources and news about education and learning.',
                color: 'purple',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Finance',
                description: 'Financial advice, news, and tips on saving money.',
                color: 'yellow',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Entertainment',
                description: 'Latest entertainment news and celebrity gossip.',
                color: 'pink',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Sports',
                description: 'Sports news, scores, and analysis.',
                color: 'cyan',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Fashion',
                description: 'Latest trends in fashion and style tips.',
                color: 'violet',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Science',
                description: 'Discoveries and news from the world of science.',
                color: 'grey',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Categories', null, {});
    }
}
