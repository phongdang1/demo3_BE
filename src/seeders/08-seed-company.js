"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Companies", [
      {
        name: "Tech Solutions Inc.",
        thumbnail: "tech-solutions-thumbnail.jpg",
        coverimage: "tech-solutions-cover.jpg",
        description:
          "Leading tech solutions provider specializing in software development and IT consulting.",
        website: "https://www.techsolutions.com",
        address: "123 Tech Street, Silicon Valley, CA",
        phonenumber: "555-123-4567",
        amountEmployer: 50,
        taxnumber: "1234567890",
        censorCode: "TS2024",
        statusCode: "active",
        userId: 1,
        file: null,
        allowPost: 1,
        allowHotPost: 1,
        allowCvFree: 1,
        allowCV: 1,
        createdAt: new Date("2024-09-13T08:00:00"),
        updatedAt: new Date("2024-09-13T08:00:00"),
      },
      {
        name: "Green Energy Ltd.",
        thumbnail: "green-energy-thumbnail.jpg",
        coverimage: "green-energy-cover.jpg",
        description:
          "Pioneering in renewable energy solutions with a focus on sustainable practices.",
        website: "https://www.greenenergy.com",
        address: "456 Green Road, Eco City, CA",
        phonenumber: "555-987-6543",
        amountEmployer: 25,
        taxnumber: "0987654321",
        censorCode: "GE2024",
        statusCode: "active",
        userId: 2,
        file: null,
        allowPost: 1,
        allowHotPost: 0,
        allowCvFree: 1,
        allowCV: 1,
        createdAt: new Date("2024-09-13T08:30:00"),
        updatedAt: new Date("2024-09-13T08:30:00"),
      },
      {
        name: "HealthCare Corp.",
        thumbnail: "healthcare-thumbnail.jpg",
        coverimage: "healthcare-cover.jpg",
        description:
          "Providing quality healthcare services and innovative health solutions.",
        website: "https://www.healthcarecorp.com",
        address: "789 Health Lane, Wellness City, CA",
        phonenumber: "555-345-6789",
        amountEmployer: 100,
        taxnumber: "1122334455",
        censorCode: "HC2024",
        statusCode: "inactive",
        userId: 3,
        file: null,
        allowPost: 0,
        allowHotPost: 1,
        allowCvFree: 0,
        allowCV: 1,
        createdAt: new Date("2024-09-13T09:00:00"),
        updatedAt: new Date("2024-09-13T09:00:00"),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Companies", null, {});
  },
};
