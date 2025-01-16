'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'permissions',
            [
                //  1
                {
                    name: 'USR01',
                    description: 'Read all users',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                //  2
                {
                    name: 'USR02',
                    description: 'Read own user',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                //  3
                {
                    name: 'USR03',
                    description: 'Create user',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                // 4
                {
                    name: 'USR04',
                    description: 'Update user',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                // 5
                {
                    name: 'USR05',
                    description: 'Delete user',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                //  6
                {
                    name: 'USR06',
                    description: 'Allow/Block user',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                // 7
                {
                    name: 'USR07',
                    description: 'Add permission',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                // 8
                {
                    name: 'CAT01',
                    description: 'Read all categories',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                // 9
                {
                    name: 'CAT02',
                    description: 'Create category',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                // 10
                {
                    name: 'CAT03',
                    description: 'Update category',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                // 11
                {
                    name: 'CAT04',
                    description: 'Delete category',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                // 12
                {
                    name: 'IDE01',
                    description: 'Read all ideas publish',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                // 13
                {
                    name: 'IDE02',
                    description: 'Read all ideas unpublish',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                // 14
                {
                    name: 'IDE03',
                    description: 'Read own idea',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                // 15
                {
                    name: 'IDE04',
                    description: 'Create idea',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                // 16
                {
                    name: 'IDE05',
                    description: 'Update own idea',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                // 17
                {
                    name: 'IDE06',
                    description: 'Delete own idea',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                // 18
                {
                    name: 'IDE07',
                    description: 'Access/Block idea',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                // 19
                {
                    name: 'ROLE01',
                    description: 'Read all roles',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                // 20
                {
                    name: 'ROLE02',
                    description: 'Create new role',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                // 21
                {
                    name: 'ROLE03',
                    description: 'Update role',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                // 22
                {
                    name: 'ROLE04',
                    description: 'Delete role',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                // 23
                {
                    name: 'PER01',
                    description: 'Read all permissions',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                // 24
                {
                    name: 'PER02',
                    description: 'Create new permission',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                // 25
                {
                    name: 'PER03',
                    description: 'Update permission',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                // 26
                {
                    name: 'PER04',
                    description: 'Delete permission',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                // 27
                {
                    name: 'GR01',
                    description: 'Create group',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                // 28
                {
                    name: 'GR02',
                    description: 'Add member',
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
