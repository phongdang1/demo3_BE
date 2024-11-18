"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("userPackages", [
      // Gói 10 bài đăng
      {
        packageId: 1,
        userId: 1,
        poinEarned: 10,
        amount: 100,
        statusCode: "active",
        createdAt: new Date(),
      },
      // Gói 20 bài đăng
      {
        packageId: 2,
        userId: 2,
        poinEarned: 20,
        amount: 200,
        statusCode: "active",
        createdAt: new Date(),
      },
      // Gói 50 bài đăng
      {
        packageId: 3,
        userId: 3,
        poinEarned: 50,
        amount: 450,
        statusCode: "active",
        createdAt: new Date(),
      },
      // Gói 100 lượt xem
      {
        packageId: 4,
        userId: 4,
        poinEarned: 10,
        amount: 50,
        statusCode: "active",
        createdAt: new Date(),
      },
      // Gói 300 lượt xem
      {
        packageId: 5,
        userId: 5,
        poinEarned: 30,
        amount: 130,
        statusCode: "active",
        createdAt: new Date(),
      },
      // Gói 700 lượt xem
      {
        packageId: 6,
        userId: 6,
        poinEarned: 70,
        amount: 300,
        statusCode: "active",
        createdAt: new Date(),
      },
      // Gói VIP
      {
        packageId: 7,
        userId: 7,
        poinEarned: 100,
        amount: 1000,
        statusCode: "active",
        createdAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("userPackages", null, {});
  },
};
