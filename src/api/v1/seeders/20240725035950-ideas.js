'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ideas', [
      {
        title: 'Developing an AI-Powered English Learning App',
        content: 'In today\'s globalized world, learning English has become essential for communication and career advancement. I propose developing an innovative English learning application that leverages artificial intelligence to personalize the learning journey for each user. The app could analyze users\' strengths and weaknesses, providing tailored exercises and resources. Additionally, incorporating features like speech recognition and interactive quizzes would enhance engagement and retention. Let\'s discuss how we can make this app a reality and explore potential technologies to utilize in its development.',
        userId: 2,
        categoryId: 1,
        voteCount: 0,
        commentCount: 0,
        viewCount: 0,
        isPublished: true,
        isDrafted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Building a Smart Hospital',
        content: 'As technology continues to advance, the healthcare sector must also evolve. I propose the development of a smart hospital that utilizes information technology to improve patient management and healthcare delivery. This could include features like electronic health records accessible in real-time, telemedicine services for remote consultations, and smart monitoring systems for patients. Such innovations could significantly enhance the efficiency of healthcare services and patient satisfaction. I would love to hear your opinions on the feasibility of this project and any additional features we could implement.',
        userId: 3,
        categoryId: 3,
        voteCount: 0,
        commentCount: 0,
        viewCount: 0,
        isPublished: true,
        isDrafted: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Innovative Solutions for Waste Management',
        content: 'Waste management is a critical issue in urban areas, and innovative solutions are needed to address it effectively. I suggest creating an application that connects users with local recycling centers and composting facilities. The app could provide users with information on what materials can be recycled and offer tips on reducing waste at home. By promoting recycling and composting, we can significantly reduce the amount of waste sent to landfills. I encourage everyone to share their ideas on how we can further enhance this concept.',
        userId: 4,
        categoryId: 4,
        voteCount: 0,
        commentCount: 0,
        viewCount: 0,
        isPublished: true,
        isDrafted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Developing a Fitness Tracking App',
        content: 'Health and fitness have become major concerns for many individuals. I propose creating a comprehensive fitness tracking app that allows users to monitor their workouts, nutrition, and progress over time. The app could integrate with wearable devices to track physical activity and provide personalized workout plans based on user goals. Additionally, incorporating a social feature to connect users with friends and fitness communities could enhance motivation and accountability. Let\'s brainstorm ideas on how to make this app stand out in the market.',
        userId: 5,
        categoryId: 2,
        voteCount: 0,
        commentCount: 0,
        viewCount: 0,
        isPublished: true,
        isDrafted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ideas', null, {});
  }
};
