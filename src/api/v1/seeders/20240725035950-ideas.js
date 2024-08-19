'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ideas', [
      {
        title: 'Automating Routine Office Tasks',
        content: 'In a busy office environment, repetitive tasks can take up valuable time. I propose developing an automation tool that can handle routine tasks such as scheduling meetings, sending reminders, and organizing files. By leveraging machine learning, the tool could learn user preferences and adapt to their workflow, saving time and reducing human error. I would love to hear your thoughts on what other features could be integrated into this tool to increase its efficiency.',
        userId: 2,
        categoryId: 1,
        voteCount: 0,
        commentCount: 0,
        viewCount: 0,
        isPublished: false,
        isDrafted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Creating an Interactive Movie Experience',
        content: 'Entertainment has always been a key aspect of our lives, and with the rise of interactive technology, I propose developing an interactive movie platform. Viewers could make decisions for characters, leading to multiple storylines and endings. This would create a more immersive and personalized experience for the audience. Let\'s explore the potential of this idea and discuss how we can make it a reality.',
        userId: 3,
        categoryId: 2,
        voteCount: 0,
        commentCount: 0,
        viewCount: 0,
        isPublished: false,
        isDrafted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Introducing Smart Recipes for Healthy Eating',
        content: 'With the increasing awareness of healthy eating, I suggest creating a smart recipe app that tailors meal plans based on users\' dietary needs and preferences. The app could provide nutrition information, shopping lists, and even suggest healthier alternatives for certain ingredients. By integrating with wearable devices, it could also adjust meal plans based on users\' activity levels. I would appreciate any input on additional features that could be included in this app.',
        userId: 4,
        categoryId: 3,
        voteCount: 0,
        commentCount: 0,
        viewCount: 0,
        isPublished: false,
        isDrafted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Launching a Community Sports Initiative',
        content: 'Engaging in regular physical activity is crucial for maintaining a healthy lifestyle. I propose launching a community sports initiative that encourages people of all ages to participate in various sports activities. The program could include events, tournaments, and workshops led by professional coaches. This initiative would not only promote physical fitness but also foster a sense of community. I invite everyone to share their thoughts on how we can get more people involved.',
        userId: 5,
        categoryId: 4,
        voteCount: 0,
        commentCount: 0,
        viewCount: 0,
        isPublished: false,
        isDrafted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Developing an Online Learning Platform for IT Skills',
        content: 'The demand for IT skills is ever-growing in today\'s job market. I propose developing an online learning platform that offers courses in various IT domains such as programming, cybersecurity, and data science. The platform could feature interactive lessons, quizzes, and real-world projects to enhance learning. By offering certifications, it could also help learners advance their careers. I look forward to hearing your suggestions on how to make this platform user-friendly and effective.',
        userId: 2,
        categoryId: 1,
        voteCount: 0,
        commentCount: 0,
        viewCount: 0,
        isPublished: false,
        isDrafted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Creating an Augmented Reality Gaming Experience',
        content: 'The gaming industry has seen rapid advancements in recent years, and augmented reality (AR) is at the forefront of this innovation. I propose creating an AR game that allows players to interact with virtual elements in the real world. The game could feature challenges, puzzles, and multiplayer modes, creating an engaging experience for users. Let\'s discuss how we can make this game a hit and explore the potential technologies to be used.',
        userId: 3,
        categoryId: 2,
        voteCount: 0,
        commentCount: 0,
        viewCount: 0,
        isPublished: false,
        isDrafted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Building a Sustainable Urban Farm',
        content: 'As urban areas continue to expand, the need for sustainable food sources becomes more pressing. I propose building an urban farm that utilizes vertical farming and hydroponic systems to grow fresh produce in the city. This farm could supply local communities with organic vegetables while reducing the carbon footprint associated with food transportation. I encourage everyone to share their ideas on how we can make this farm a success and promote sustainable living in our city.',
        userId: 4,
        categoryId: 3,
        voteCount: 0,
        commentCount: 0,
        viewCount: 0,
        isPublished: false,
        isDrafted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Organizing a Community Sports Day',
        content: 'Community engagement is vital for fostering social connections and promoting a healthy lifestyle. I propose organizing a Community Sports Day where residents can participate in various sports activities such as football, basketball, and running. This event could also include fitness workshops and health check-ups, encouraging people to adopt healthier habits. I would love to hear your ideas on how we can make this event a success and get more people involved.',
        userId: 5,
        categoryId: 4,
        voteCount: 0,
        commentCount: 0,
        viewCount: 0,
        isPublished: false,
        isDrafted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Developing a Technical Blogging Platform',
        content: 'With the rise of technology, there is a growing need for platforms where professionals can share their knowledge and experiences. I propose developing a technical blogging platform where IT professionals, engineers, and technologists can publish articles, tutorials, and case studies. The platform could also feature discussion forums and Q&A sections to foster collaboration and knowledge sharing. Let\'s discuss how we can build this platform and make it a valuable resource for the tech community.',
        userId: 2,
        categoryId: 1,
        voteCount: 0,
        commentCount: 0,
        viewCount: 0,
        isPublished: false,
        isDrafted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Hosting an E-Sports Tournament',
        content: 'E-sports have gained immense popularity in recent years, attracting millions of viewers worldwide. I propose hosting an e-sports tournament featuring popular games such as League of Legends, Fortnite, and Dota 2. The tournament could include both amateur and professional players, with live streaming for global audiences. This event would not only entertain but also promote the growth of the e-sports community. I look forward to hearing your thoughts on how we can organize this tournament and make it a memorable experience for participants and viewers.',
        userId: 3,
        categoryId: 2,
        voteCount: 0,
        commentCount: 0,
        viewCount: 0,
        isPublished: false,
        isDrafted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Implementing AI in Work Task Management',
        content: 'In the modern workplace, managing tasks efficiently is crucial for productivity. I suggest developing an AI-driven task management tool that can prioritize tasks based on deadlines, importance, and user preferences. The AI could learn from user behavior to optimize task scheduling and reduce bottlenecks. This tool would be especially useful in dynamic environments where priorities constantly shift. Let\'s discuss the potential impact of such a tool on workplace efficiency and how we can develop it.',
        userId: 2,
        categoryId: 1,
        voteCount: 0,
        commentCount: 0,
        viewCount: 0,
        isPublished: false,
        isDrafted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Creating a Virtual Reality Entertainment Hub',
        content: 'Virtual reality (VR) is transforming the way we experience entertainment. I propose creating a VR entertainment hub where users can explore virtual worlds, play immersive games, and interact with others in a social setting. The hub could feature different themed environments, from futuristic cities to fantasy landscapes, providing endless entertainment possibilities. Let\'s brainstorm ideas on how to make this VR hub a unique and engaging experience for users.',
        userId: 3,
        categoryId: 2,
        voteCount: 0,
        commentCount: 0,
        viewCount: 0,
        isPublished: false,
        isDrafted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Launching a Farm-to-Table Food Delivery Service',
        content: 'As consumers become more conscious about the origins of their food, the demand for fresh, locally-sourced produce is growing. I propose launching a farm-to-table food delivery service that connects local farmers with consumers. The service could offer subscription-based delivery of seasonal produce, along with recipes and cooking tips. This would support local agriculture while providing consumers with high-quality, fresh ingredients. I would love to hear your thoughts on how we can promote this service and make it accessible to a wide audience.',
        userId: 4,
        categoryId: 3,
        voteCount: 0,
        commentCount: 0,
        viewCount: 0,
        isPublished: false,
        isDrafted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Establishing a Corporate Sports League',
        content: 'Promoting physical activity in the workplace can have significant benefits for employee health and morale. I propose establishing a corporate sports league where companies can form teams and compete in various sports such as football, basketball, and volleyball. The league could hold regular matches and tournaments, fostering camaraderie and a sense of community among employees. I would appreciate any input on how we can organize this league and encourage participation from different companies.',
        userId: 5,
        categoryId: 4,
        voteCount: 0,
        commentCount: 0,
        viewCount: 0,
        isPublished: false,
        isDrafted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Developing a DIY Technology Kit for Kids',
        content: 'Introducing technology to children at an early age can spark their interest in STEM fields. I propose developing a DIY technology kit that allows kids to build their own gadgets and learn about electronics, coding, and robotics. The kit could include easy-to-follow instructions and online tutorials, making it accessible for children and parents alike. This hands-on approach would not only be educational but also fun and engaging. Let\'s discuss how we can create a kit that inspires the next generation of tech enthusiasts.',
        userId: 2,
        categoryId: 5,
        voteCount: 0,
        commentCount: 0,
        viewCount: 0,
        isPublished: false,
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
