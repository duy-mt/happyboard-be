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
                    jobPosition: 'Intent MyFPT',
                    introduce:
                        'A dedicated and eager software development intern with a passion for learning and building effective backend systems. Driven by curiosity and a commitment to excellence, they focus on honing their skills and contributing to impactful projects.',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    email: 'bathangvu@gmail.com',
                    password:
                        '$2a$10$GyqMakjEG34Jjn76BKQk8eFVwiW1aECKdq4TfVcTZMl6Ph6J0mJEq',
                    username: 'Thang Vu Ba',
                    avatar: '',
                    phone: '0378481575',
                    status: 'active',
                    isOnline: false,
                    jobPosition: 'Intent MyFPT',
                    introduce:
                        'A dedicated and eager software development intern with a passion for learning and building effective backend systems. Driven by curiosity and a commitment to excellence, they focus on honing their skills and contributing to impactful projects.',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    email: 'phanngockhai888@gmail.com',
                    password:
                        '$2a$10$GyqMakjEG34Jjn76BKQk8eFVwiW1aECKdq4TfVcTZMl6Ph6J0mJEq',
                    username: 'Khai Phan Ngoc',
                    avatar: '',
                    phone: '0378481575',
                    status: 'active',
                    isOnline: false,
                    jobPosition: 'Intent MyFPT',
                    introduce:
                        'A dedicated and eager software development intern with a passion for learning and building effective backend systems. Driven by curiosity and a commitment to excellence, they focus on honing their skills and contributing to impactful projects.',
                    createdAt: new Date(),
                    updatedAt: new Date(),
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
                    jobPosition: 'Intent MyFPT',
                    introduce:
                        'A dedicated and eager software development intern with a passion for learning and building effective backend systems. Driven by curiosity and a commitment to excellence, they focus on honing their skills and contributing to impactful projects.',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    email: 'laduchung25032005@gmail.com',
                    password:
                        '$2a$10$GyqMakjEG34Jjn76BKQk8eFVwiW1aECKdq4TfVcTZMl6Ph6J0mJEq',
                    username: 'Hung La Duc',
                    avatar: '',
                    phone: '0378481575',
                    status: 'active',
                    isOnline: false,
                    jobPosition: 'Intent MyFPT',
                    introduce:
                        'A dedicated and eager software development intern with a passion for learning and building effective backend systems. Driven by curiosity and a commitment to excellence, they focus on honing their skills and contributing to impactful projects.',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {},
        )
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('users', null, {})
    },
}
