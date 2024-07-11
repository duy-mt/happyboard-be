'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // fk_token_user
        await queryInterface.addConstraint('Tokens', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'fk_token_user',
            references: {
                table: 'Users',
                field: 'id',
            },
            onUpdate: 'CASCADE', // Automatically update foreign key when primary key changes
            onDelete: 'CASCADE', // Automatically delete related records when referenced record is deleted
        });

        // fk_idea_user
        await queryInterface.addConstraint('Ideas', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'fk_idea_user',
            references: {
                table: 'Users',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });

        // fk_comment_user
        await queryInterface.addConstraint('Comments', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'fk_comment_user',
            references: {
                table: 'Users',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });

        // fk_vote_user
        await queryInterface.addConstraint('Votes', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'fk_vote_user',
            references: {
                table: 'Users',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });

        // fk_reaction_user
        await queryInterface.addConstraint('Reactions', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'fk_reaction_user',
            references: {
                table: 'Users',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });

        // fk_ur_user
        await queryInterface.addConstraint('User_Role', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'fk_ur_user',
            references: {
                table: 'Users',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });

        // fk_idea_category
        await queryInterface.addConstraint('Ideas', {
            fields: ['categoryId'],
            type: 'foreign key',
            name: 'fk_idea_category',
            references: {
                table: 'Categories',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });

        // fk_comment_idea
        await queryInterface.addConstraint('Comments', {
            fields: ['ideaId'],
            type: 'foreign key',
            name: 'fk_comment_idea',
            references: {
                table: 'Ideas',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });

        // fk_vote_idea
        await queryInterface.addConstraint('Votes', {
            fields: ['ideaId'],
            type: 'foreign key',
            name: 'fk_vote_idea',
            references: {
                table: 'Ideas',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });

        // fk_reaction_comment
        await queryInterface.addConstraint('Reactions', {
            fields: ['commentId'],
            type: 'foreign key',
            name: 'fk_reaction_comment',
            references: {
                table: 'Comments',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });

        // fk_ur_role
        await queryInterface.addConstraint('User_Role', {
            fields: ['roleId'],
            type: 'foreign key',
            name: 'fk_ur_role',
            references: {
                table: 'Roles',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });

        // fk_rf_role
        await queryInterface.addConstraint('Role_Feature', {
            fields: ['roleId'],
            type: 'foreign key',
            name: 'fk_rf_role',
            references: {
                table: 'Roles',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });

        // fk_rf_feature
        await queryInterface.addConstraint('Role_Feature', {
            fields: ['featureId'],
            type: 'foreign key',
            name: 'fk_rf_feature',
            references: {
                table: 'Features',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });
    },

    async down(queryInterface, Sequelize) {
        // Remove foreign key constraints

        await queryInterface.removeConstraint('Tokens', 'fk_token_user');
        await queryInterface.removeConstraint('Ideas', 'fk_idea_user');
        await queryInterface.removeConstraint('Comments', 'fk_comment_user');
        await queryInterface.removeConstraint('Votes', 'fk_vote_user');
        await queryInterface.removeConstraint('Reactions', 'fk_reaction_user');
        await queryInterface.removeConstraint('User_Role', 'fk_ur_user');
        await queryInterface.removeConstraint('Ideas', 'fk_idea_category');
        await queryInterface.removeConstraint('Comments', 'fk_comment_idea');
        await queryInterface.removeConstraint('Votes', 'fk_vote_idea');
        await queryInterface.removeConstraint('Reactions', 'fk_reaction_comment');
        await queryInterface.removeConstraint('User_Role', 'fk_ur_role');
        await queryInterface.removeConstraint('Role_Feature', 'fk_rf_role');
        await queryInterface.removeConstraint('Role_Feature', 'fk_rf_feature');
    }
};
