'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'permissions',
            [
                {
                    name: 'USR01',
                    description: 'Read all users',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'USR02',
                    description: 'Read own user',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'USR03',
                    description: 'Create user',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'USR04',
                    description: 'Update user',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'USR05',
                    description: 'Delete user',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'USR06',
                    description: 'Allow/Block user',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'USR07',
                    description: 'Add permission',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'CAT01',
                    description: 'Read all categories',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'CAT02',
                    description: 'Create category',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'CAT03',
                    description: 'Update category',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'CAT04',
                    description: 'Delete category',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'IDE01',
                    description: 'Read all ideas publish',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'IDE02',
                    description: 'Read all ideas unpublish',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'IDE03',
                    description: 'Read own idea',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'IDE04',
                    description: 'Create idea',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'IDE05',
                    description: 'Update own idea',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'IDE06',
                    description: 'Delete own idea',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'IDE07',
                    description: 'Access/Block idea',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {},
        )
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('permissions', null, {})
    },
}
