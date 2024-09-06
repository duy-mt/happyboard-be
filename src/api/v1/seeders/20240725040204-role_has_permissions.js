'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'role_has_permissions',
            [
                // Super-Admin permissions
                {
                    roleId: 1,
                    permissionId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 1,
                    permissionId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 1,
                    permissionId: 3,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 1,
                    permissionId: 6,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 1,
                    permissionId: 7,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 1,
                    permissionId: 8,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 1,
                    permissionId: 9,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 1,
                    permissionId: 10,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 1,
                    permissionId: 11,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 1,
                    permissionId: 12,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 1,
                    permissionId: 13,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 1,
                    permissionId: 14,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 1,
                    permissionId: 15,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 1,
                    permissionId: 16,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 1,
                    permissionId: 17,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 1,
                    permissionId: 18,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },

                // Admin permissions
                {
                    roleId: 2,
                    permissionId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 2,
                    permissionId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 2,
                    permissionId: 6,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 2,
                    permissionId: 8,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 2,
                    permissionId: 9,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 2,
                    permissionId: 10,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 2,
                    permissionId: 11,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 2,
                    permissionId: 12,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 2,
                    permissionId: 13,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 2,
                    permissionId: 14,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 2,
                    permissionId: 15,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 2,
                    permissionId: 16,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 2,
                    permissionId: 17,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 2,
                    permissionId: 18,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },

                // User permissions
                {
                    roleId: 3,
                    permissionId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 3,
                    permissionId: 4,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 3,
                    permissionId: 5,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 3,
                    permissionId: 8,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 3,
                    permissionId: 12,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 3,
                    permissionId: 14,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 3,
                    permissionId: 15,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 3,
                    permissionId: 16,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 3,
                    permissionId: 17,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },

                // Pending-User permissions
                {
                    roleId: 4,
                    permissionId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 4,
                    permissionId: 4,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 4,
                    permissionId: 5,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 4,
                    permissionId: 8,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 4,
                    permissionId: 12,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 4,
                    permissionId: 14,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 4,
                    permissionId: 16,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    roleId: 4,
                    permissionId: 17,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {},
        )
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('role_has_permissions', null, {})
    },
}
