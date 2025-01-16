'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'users',
            [
                {
                    email: 'admin@example.com',
                    password:
                        '$2a$10$GyqMakjEG34Jjn76BKQk8eFVwiW1aECKdq4TfVcTZMl6Ph6J0mJEq', // password123
                    username: 'Administrator',
                    avatar: '',
                    phone: '0378481575',
                    status: 'active',
                    isOnline: false,
                    jobPosition: 'Admin',
                    introduce:
                        'A dedicated and eager software development intern with a passion for learning and building effective backend systems. Driven by curiosity and a commitment to excellence, they focus on honing their skills and contributing to impactful projects.',
                    createdAt: new Date('2025-01-15T08:00:00Z'),
                    updatedAt: new Date('2025-01-15T08:00:00Z'),
                },
                {
                    email: 'nguyenvana@gmail.com',
                    password:
                        '$2a$10$GyqMakjEG34Jjn76BKQk8eFVwiW1aECKdq4TfVcTZMl6Ph6J0mJEq',
                    username: 'Nguyen Van A',
                    avatar: '',
                    phone: '0378481575',
                    status: 'active',
                    isOnline: false,
                    jobPosition: 'Intern',
                    introduce:
                        'A dedicated and eager software development intern with a passion for learning and building effective backend systems. Driven by curiosity and a commitment to excellence, they focus on honing their skills and contributing to impactful projects.',
                    createdAt: new Date('2025-01-15T08:00:00Z'),
                    updatedAt: new Date('2025-01-15T08:00:00Z'),
                },
                {
                    email: 'nguyenvanb@gmail.com',
                    password:
                        '$2a$10$GyqMakjEG34Jjn76BKQk8eFVwiW1aECKdq4TfVcTZMl6Ph6J0mJEq',
                    username: 'Nguyen Van B',
                    avatar: '',
                    phone: '0378481575',
                    status: 'active',
                    isOnline: false,
                    jobPosition: 'Intern',
                    introduce:
                        'A dedicated and eager software development intern with a passion for learning and building effective backend systems. Driven by curiosity and a commitment to excellence, they focus on honing their skills and contributing to impactful projects.',
                    createdAt: new Date('2025-01-16T08:00:00Z'),
                    updatedAt: new Date('2025-01-16T08:00:00Z'),
                },
                {
                    email: 'duy.mtdevhust@gmail.com',
                    password:
                        '$2a$10$GyqMakjEG34Jjn76BKQk8eFVwiW1aECKdq4TfVcTZMl6Ph6J0mJEq',
                    username: 'Duy Mai Tran',
                    avatar: '',
                    phone: '0378481575',
                    status: 'active',
                    isOnline: false,
                    jobPosition: 'Developer',
                    introduce:
                        'A dedicated and eager software development intern with a passion for learning and building effective backend systems. Driven by curiosity and a commitment to excellence, they focus on honing their skills and contributing to impactful projects.',
                    createdAt: new Date('2025-01-16T08:00:00Z'),
                    updatedAt: new Date('2025-01-16T08:00:00Z'),
                },
                {
                    email: 'nguyenvanc@gmail.com',
                    password:
                        '$2a$10$GyqMakjEG34Jjn76BKQk8eFVwiW1aECKdq4TfVcTZMl6Ph6J0mJEq',
                    username: 'Nguyen Van C',
                    avatar: '',
                    phone: '0378481575',
                    status: 'active',
                    isOnline: false,
                    jobPosition: 'Intern',
                    introduce:
                        'A dedicated and eager software development intern with a passion for learning and building effective backend systems. Driven by curiosity and a commitment to excellence, they focus on honing their skills and contributing to impactful projects.',
                    createdAt: new Date('2025-01-17T08:00:00Z'),
                    updatedAt: new Date('2025-01-17T08:00:00Z'),
                },
            ],
            {},
        )
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('users', null, {})
    },
}
