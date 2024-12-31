'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'ideas',
            [
                {
                    title: 'Chọn quà Tết 2024 cho người thân',
                    content: `
                        <p>Chọn quà Tết cho gia đình là một phần không thể thiếu trong mỗi dịp Tết. Bạn có thể chọn những món quà như thực phẩm cao cấp, quà tặng sức khỏe hay các sản phẩm thủ công mỹ nghệ.</p>
                        <p>Để tiết kiệm thời gian, bạn có thể tham khảo <a href="https://res.cloudinary.com/daokqrkdk/image/upload/v1735077298/download_s3sghp.jpg">hướng dẫn chọn quà Tết 2024</a>.</p>
                        <img src="https://res.cloudinary.com/daokqrkdk/image/upload/v1735077289/download_kq7sp9.jpg" alt="Quà Tết 2024" />
                    `,
                    userId: 2,
                    groupId: 2,
                    categoryId: 1,
                    voteCount: 0,
                    commentCount: 0,
                    viewCount: 0,
                    isPublished: true,
                    isDrafted: false,
                    type: 'text',
                    linkUrl: null,
                    linkMedia: null,
                    thumbnailUrl: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Nâng cấp cơ sở vật chất văn phòng',
                    content: `
                        <p>Với nhu cầu làm việc từ xa gia tăng, việc nâng cấp cơ sở vật chất như bàn làm việc, ghế ngồi thoải mái và các thiết bị công nghệ tiên tiến rất quan trọng.</p>
                        <p>Đọc thêm về các cách nâng cấp cơ sở vật chất văn phòng tại <a href="https://res.cloudinary.com/daokqrkdk/image/upload/v1735077410/download_kclz4x.jpg">đây</a>.</p>
                        <img src="https://res.cloudinary.com/daokqrkdk/image/upload/v1735077404/download_pj8b7f.jpg" alt="Nâng cấp cơ sở vật chất văn phòng" />
                    `,
                    userId: 3,
                    groupId: 2,
                    categoryId: 2,
                    voteCount: 0,
                    commentCount: 0,
                    viewCount: 0,
                    isPublished: true,
                    isDrafted: false,
                    type: 'text',
                    linkUrl: null,
                    linkMedia: null,
                    thumbnailUrl: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Trưa nay ăn gì? Cùng thử các món mới!',
                    content: `
                        <p>Trưa nay, bạn có thể thử các món ăn mới như phở cuốn, bún bò Huế hay sushi tự làm. Đây là những món ăn nhanh nhưng đầy đủ dinh dưỡng.</p>
                        <p><a href="https://www.example.com/lunch-ideas">Xem thêm các ý tưởng bữa trưa ngon miệng tại đây</a>.</p>
                        <video src="https://youtu.be/0B0L-Icia4M?si=XEK1DrLCF5NRl9pA" controls></video>
                    `,
                    userId: 3,
                    groupId: 2,
                    categoryId: 3,
                    voteCount: 0,
                    commentCount: 0,
                    viewCount: 0,
                    isPublished: true,
                    isDrafted: false,
                    type: 'text',
                    linkUrl: null,
                    linkMedia: null,
                    thumbnailUrl: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Thể thao nâng cao sức khỏe mỗi ngày',
                    content: `
                        <p>Chúng ta nên tập thể thao mỗi ngày để duy trì sức khỏe tốt. Bạn có thể tham gia các lớp yoga, chạy bộ hoặc đạp xe cùng bạn bè.</p>
                        <p>Hãy thử bài tập yoga này qua video dưới đây để cảm nhận sự khác biệt: </p>
                        <video src="https://youtu.be/B4kNiCWTl7M?si=vEvLQCO7U_FaGq3N" controls></video>
                    `,
                    userId: 4,
                    groupId: 2,
                    categoryId: 4,
                    voteCount: 0,
                    commentCount: 0,
                    viewCount: 0,
                    isPublished: true,
                    isDrafted: false,
                    type: 'text',
                    linkUrl: null,
                    linkMedia: null,
                    thumbnailUrl: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Học hỏi công nghệ 2024: Khám phá AI',
                    content: `
                        <p>AI đang thay đổi cách chúng ta làm việc và học tập. Hãy bắt đầu với những khóa học cơ bản về AI và machine learning.</p>
                        <p>Tham gia khóa học trực tuyến này để hiểu rõ hơn về AI: <a href="https://www.example.com/learn-ai">Khóa học AI cơ bản</a>.</p>
                        <img src="https://res.cloudinary.com/daokqrkdk/image/upload/v1735077659/download_haltbi.jpg" alt="AI Learning" />
                    `,
                    userId: 5,
                    groupId: 2,
                    categoryId: 5,
                    voteCount: 0,
                    commentCount: 0,
                    viewCount: 0,
                    isPublished: true,
                    isDrafted: false,
                    type: 'text',
                    linkUrl: null,
                    linkMedia: null,
                    thumbnailUrl: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },


                {
                    title: 'Chọn quà Tết 2024 cho bạn bè',
                    content: `
                        <p>Quà Tết cho bạn bè có thể là những món đồ tinh tế như đồng hồ, sổ tay, hoặc các sản phẩm handmade. Hãy chọn những món quà phản ánh sở thích của người nhận.</p>
                        <p>Để tham khảo thêm, bạn có thể xem gợi ý chọn quà tại <a href="https://res.cloudinary.com/daokqrkdk/image/upload/v1735077277/download_izbqy5.jpg">đây</a>.</p>
                        <img src="https://res.cloudinary.com/daokqrkdk/image/upload/v1735077209/download_luzjvs.jpg" alt="Quà Tết cho bạn bè" />
                    `,
                    userId: 2,
                    groupId: 1,
                    categoryId: 1,
                    voteCount: 0,
                    commentCount: 0,
                    viewCount: 0,
                    isPublished: true,
                    isDrafted: false,
                    type: 'text',
                    linkUrl: null,
                    linkMedia: null,
                    thumbnailUrl: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Nâng cấp không gian làm việc tại nhà',
                    content: `
                        <p>Việc cải thiện không gian làm việc tại nhà sẽ giúp tăng năng suất và sự thoải mái. Bạn có thể thay đổi bàn làm việc, ghế ngồi hoặc trang trí lại căn phòng.</p>
                        <p>Khám phá các mẹo nâng cấp không gian làm việc tại <a href="https://www.example.com/upgrade-home-office">đây</a>.</p>
                        <img src="https://res.cloudinary.com/daokqrkdk/image/upload/v1735077389/download_u6gyk4.jpg" alt="Không gian làm việc tại nhà" />
                    `,
                    userId: 2,
                    groupId: 1,
                    categoryId: 2,
                    voteCount: 0,
                    commentCount: 0,
                    viewCount: 0,
                    isPublished: true,
                    isDrafted: false,
                    type: 'text',
                    linkUrl: null,
                    linkMedia: null,
                    thumbnailUrl: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Ăn sáng gì hôm nay? Gợi ý nhanh chóng',
                    content: `
                        <p>Buổi sáng là thời gian lý tưởng để ăn những món ăn bổ dưỡng như bánh mì ốp la, cháo thịt bằm hay smoothie trái cây. Hãy thử những món ăn mới để bắt đầu ngày mới tràn đầy năng lượng.</p>
                        <p>Khám phá các công thức sáng tạo tại <a href="https://www.example.com/breakfast-ideas">đây</a>.</p>
                        <video src="https://youtu.be/uIrknRT8bB8?si=N1WSOo5OjLExbUMV" controls></video>
                    `,
                    userId: 3,
                    groupId: 1,
                    categoryId: 3,
                    voteCount: 0,
                    commentCount: 0,
                    viewCount: 0,
                    isPublished: true,
                    isDrafted: false,
                    type: 'text',
                    linkUrl: null,
                    linkMedia: null,
                    thumbnailUrl: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Bí quyết tập thể dục cho người mới bắt đầu',
                    content: `
                        <p>Bắt đầu tập thể dục từ những bước đơn giản như đi bộ, chạy bộ nhẹ, hoặc các bài tập tại nhà như plank, squats sẽ giúp cơ thể dẻo dai và khỏe mạnh.</p>
                        <p>Hãy tham gia khóa học online về thể dục tại <a href="https://www.example.com/beginner-fitness">đây</a>.</p>
                        <img src="https://res.cloudinary.com/daokqrkdk/image/upload/v1735077569/download_pqaczv.jpg" alt="Tập thể dục cho người mới bắt đầu" />
                    `,
                    userId: 4,
                    groupId: 1,
                    categoryId: 4,
                    voteCount: 0,
                    commentCount: 0,
                    viewCount: 0,
                    isPublished: true,
                    isDrafted: false,
                    type: 'text',
                    linkUrl: null,
                    linkMedia: null,
                    thumbnailUrl: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Tìm hiểu về công nghệ Blockchain',
                    content: `
                        <p>Blockchain không chỉ áp dụng cho tiền điện tử mà còn có nhiều ứng dụng trong các ngành công nghiệp khác như tài chính, bảo mật và chuỗi cung ứng.</p>
                        <p>Khám phá những ứng dụng thú vị của Blockchain tại <a href="https://www.example.com/blockchain-applications">đây</a>.</p>
                        <img src="https://res.cloudinary.com/daokqrkdk/image/upload/v1735077656/download_y6ewo3.jpg" alt="Công nghệ Blockchain" />
                    `,
                    userId: 5,
                    groupId: 1,
                    categoryId: 5,
                    voteCount: 0,
                    commentCount: 0,
                    viewCount: 0,
                    isPublished: true,
                    isDrafted: false,
                    type: 'text',
                    linkUrl: null,
                    linkMedia: null,
                    thumbnailUrl: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Các hoạt động thể thao mùa hè',
                    content: `
                        <p>Mùa hè là thời điểm lý tưởng để tham gia các môn thể thao ngoài trời như bóng đá, bóng chuyền, bơi lội hay chạy bộ.</p>
                        <p>Khám phá các hoạt động thể thao thú vị trong mùa hè tại <a href="https://www.example.com/summer-sports">đây</a>.</p>
                        <img src="https://res.cloudinary.com/daokqrkdk/image/upload/v1735077552/download_e0uv0t.jpg" alt="Hoạt động thể thao mùa hè" />
                    `,
                    userId: 5,
                    groupId: 1,
                    categoryId: 4,
                    voteCount: 0,
                    commentCount: 0,
                    viewCount: 0,
                    isPublished: true,
                    isDrafted: false,
                    type: 'text',
                    linkUrl: null,
                    linkMedia: null,
                    thumbnailUrl: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Làm sao để giữ động lực học tập',
                    content: `
                        <p>Để duy trì động lực học tập, bạn cần có kế hoạch học rõ ràng và tìm ra các phương pháp học tập thú vị, hiệu quả.</p>
                        <p>Hãy đọc bài viết về cách giữ động lực học tập tại <a href="https://www.example.com/study-motivation">đây</a>.</p>
                        <img src="https://res.cloudinary.com/daokqrkdk/image/upload/v1735077652/download_jodrr4.jpg" alt="Giữ động lực học tập" />
                    `,
                    userId: 4,
                    groupId: 1,
                    categoryId: 5,
                    voteCount: 0,
                    commentCount: 0,
                    viewCount: 0,
                    isPublished: true,
                    isDrafted: false,
                    type: 'text',
                    linkUrl: null,
                    linkMedia: null,
                    thumbnailUrl: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Chăm sóc sức khỏe mùa lạnh',
                    content: `
                        <p>Mùa lạnh là thời điểm dễ mắc các bệnh về đường hô hấp. Hãy đảm bảo rằng bạn giữ ấm cơ thể, ăn uống đầy đủ dinh dưỡng và tập thể dục đều đặn.</p>
                        <p>Khám phá các mẹo chăm sóc sức khỏe mùa lạnh tại <a href="https://www.example.com/winter-health-tips">đây</a>.</p>
                        <img src="https://res.cloudinary.com/daokqrkdk/image/upload/v1735077546/download_o5wky4.jpg" alt="Chăm sóc sức khỏe mùa lạnh" />
                    `,
                    userId: 4,
                    groupId: 1,
                    categoryId: 4,
                    voteCount: 0,
                    commentCount: 0,
                    viewCount: 0,
                    isPublished: true,
                    isDrafted: false,
                    type: 'text',
                    linkUrl: null,
                    linkMedia: null,
                    thumbnailUrl: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Làm việc hiệu quả từ xa',
                    content: `
                        <p>Để làm việc hiệu quả từ xa, bạn cần một không gian làm việc chuyên nghiệp, tập trung vào công việc và kết nối mạng tốt.</p>
                        <p>Khám phá các mẹo làm việc từ xa hiệu quả tại <a href="https://www.example.com/remote-work-tips">đây</a>.</p>
                        <img src="https://res.cloudinary.com/daokqrkdk/image/upload/v1735077398/download_rfbjc6.jpg" alt="Làm việc hiệu quả từ xa" />
                    `,
                    userId: 2,
                    groupId: 1,
                    categoryId: 2,
                    voteCount: 0,
                    commentCount: 0,
                    viewCount: 0,
                    isPublished: true,
                    isDrafted: false,
                    type: 'text',
                    linkUrl: null,
                    linkMedia: null,
                    thumbnailUrl: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Trải nghiệm công nghệ thực tế ảo',
                    content: `
                        <p>Công nghệ thực tế ảo (VR) đang ngày càng phát triển, giúp bạn có những trải nghiệm mới lạ trong học tập và giải trí.</p>
                        <p>Khám phá các ứng dụng thực tế ảo tại <a href="https://www.example.com/virtual-reality">đây</a>.</p>
                        <img src="https://res.cloudinary.com/daokqrkdk/image/upload/v1735077652/download_jodrr4.jpg" alt="Trải nghiệm thực tế ảo" />
                    `,
                    userId: 3,
                    groupId: 1,
                    categoryId: 5,
                    voteCount: 0,
                    commentCount: 0,
                    viewCount: 0,
                    isPublished: true,
                    isDrafted: false,
                    type: 'text',
                    linkUrl: null,
                    linkMedia: null,
                    thumbnailUrl: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {},
        )
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('ideas', null, {})
    },
}
