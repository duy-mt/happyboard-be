'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // fk_tokens_user
        await queryInterface.addConstraint('tokens', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'fk_tokens_user',
            references: {
                table: 'users',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        })

        // fk_ideas_user
        await queryInterface.addConstraint('ideas', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'fk_ideas_user',
            references: {
                table: 'users',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        })

        // fk_ideas_category
        await queryInterface.addConstraint('ideas', {
            fields: ['categoryId'],
            type: 'foreign key',
            name: 'fk_ideas_category',
            references: {
                table: 'categories',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        })

        // fk_comments_user
        await queryInterface.addConstraint('comments', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'fk_comments_user',
            references: {
                table: 'users',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        })

        // fk_comments_idea
        await queryInterface.addConstraint('comments', {
            fields: ['ideaId'],
            type: 'foreign key',
            name: 'fk_comments_idea',
            references: {
                table: 'ideas',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        })

        // fk_comments_parent
        await queryInterface.addConstraint('comments', {
            fields: ['parentId'],
            type: 'foreign key',
            name: 'fk_comments_parent',
            references: {
                table: 'comments',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        })

        // fk_reactions_user
        await queryInterface.addConstraint('reactions', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'fk_reactions_user',
            references: {
                table: 'users',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        })

        // fk_reactions_comment
        await queryInterface.addConstraint('reactions', {
            fields: ['commentId'],
            type: 'foreign key',
            name: 'fk_reactions_comment',
            references: {
                table: 'comments',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        })

        // fk_votes_user
        await queryInterface.addConstraint('votes', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'fk_votes_user',
            references: {
                table: 'users',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        })

        // fk_votes_idea
        await queryInterface.addConstraint('votes', {
            fields: ['ideaId'],
            type: 'foreign key',
            name: 'fk_votes_idea',
            references: {
                table: 'ideas',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        })

        // fk_user_has_roles_user
        await queryInterface.addConstraint('user_has_roles', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'fk_user_has_roles_user',
            references: {
                table: 'users',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        })

        // fk_user_has_roles_role
        await queryInterface.addConstraint('user_has_roles', {
            fields: ['roleId'],
            type: 'foreign key',
            name: 'fk_user_has_roles_role',
            references: {
                table: 'roles',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        })

        // fk_user_has_permissions_user
        await queryInterface.addConstraint('user_has_permissions', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'fk_user_has_permissions_user',
            references: {
                table: 'users',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        })

        // fk_user_has_permissions_permission
        await queryInterface.addConstraint('user_has_permissions', {
            fields: ['permissionId'],
            type: 'foreign key',
            name: 'fk_user_has_permissions_permission',
            references: {
                table: 'permissions',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        })

        // fk_role_has_permissions_role
        await queryInterface.addConstraint('role_has_permissions', {
            fields: ['roleId'],
            type: 'foreign key',
            name: 'fk_role_has_permissions_role',
            references: {
                table: 'roles',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        })

        // fk_role_has_permissions_permission
        await queryInterface.addConstraint('role_has_permissions', {
            fields: ['permissionId'],
            type: 'foreign key',
            name: 'fk_role_has_permissions_permission',
            references: {
                table: 'permissions',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        })

        // fk_notifications_user_field_from
        await queryInterface.addConstraint('notifications', {
            fields: ['from'],
            type: 'foreign key',
            name: 'fk_notifications_user_field_from',
            references: {
                table: 'users',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        })

        // fk_notifications_user_field_to
        await queryInterface.addConstraint('notifications', {
            fields: ['to'],
            type: 'foreign key',
            name: 'fk_notifications_user_field_to',
            references: {
                table: 'users',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        })
        // ADD HISTORY
        // fk_histories_user_field_userId
        await queryInterface.addConstraint('histories', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'fk_histories_user_field_userId',
            references: {
                table: 'users',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        })

        // fk_histories_user_field_userTargetId
        await queryInterface.addConstraint('histories', {
            fields: ['userTargetId'],
            type: 'foreign key',
            name: 'fk_histories_user_field_userTargetId',
            references: {
                table: 'users',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        })
    },

    async down(queryInterface, Sequelize) {
        // Remove foreign key constraints
        await queryInterface.removeConstraint('tokens', 'fk_tokens_user')
        await queryInterface.removeConstraint('ideas', 'fk_ideas_user')
        await queryInterface.removeConstraint('ideas', 'fk_ideas_category')
        await queryInterface.removeConstraint('comments', 'fk_comments_user')
        await queryInterface.removeConstraint('comments', 'fk_comments_idea')
        await queryInterface.removeConstraint('comments', 'fk_comments_parent')
        await queryInterface.removeConstraint('reactions', 'fk_reactions_user')
        await queryInterface.removeConstraint(
            'reactions',
            'fk_reactions_comment',
        )
        await queryInterface.removeConstraint('votes', 'fk_votes_user')
        await queryInterface.removeConstraint('votes', 'fk_votes_idea')
        await queryInterface.removeConstraint(
            'user_has_roles',
            'fk_user_has_roles_user',
        )
        await queryInterface.removeConstraint(
            'user_has_roles',
            'fk_user_has_roles_role',
        )
        await queryInterface.removeConstraint(
            'user_has_permissions',
            'fk_user_has_permissions_user',
        )
        await queryInterface.removeConstraint(
            'user_has_permissions',
            'fk_user_has_permissions_permission',
        )
        await queryInterface.removeConstraint(
            'role_has_permissions',
            'fk_role_has_permissions_role',
        )
        await queryInterface.removeConstraint(
            'role_has_permissions',
            'fk_role_has_permissions_permission',
        )
        await queryInterface.removeConstraint(
            'notifications',
            'fk_notifications_user_field_from',
        )
        await queryInterface.removeConstraint(
            'notifications',
            'fk_notifications_user_field_to',
        )
        await queryInterface.removeConstraint(
            'histories',
            'fk_histories_user_field_userId',
        )
        await queryInterface.removeConstraint(
            'histories',
            'fk_histories_user_field_userTargetId',
        )
    },
}
