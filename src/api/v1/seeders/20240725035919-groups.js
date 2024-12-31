'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'groups',
            [
                
                {
                    name: 'None',
                    description: 'None',
                    avatar: '',
                    background: '',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'Ăn chơi nhảy múa',
                    description: 'Nhóm ngoài công việc',
                    avatar: 'https://res.cloudinary.com/daokqrkdk/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1735490243/group/4_1735490242325.jpg',
                    background: 'https://res.cloudinary.com/daokqrkdk/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.50/c_scale,co_rgb:ffffff,fl_relative,l_text:montserrat_25_style_light_align_center:Shop%20Now,w_0.5,y_0.18/v1735499229/group/4_1735499227604.png',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {},
        )
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
}
