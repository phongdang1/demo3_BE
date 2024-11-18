"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Packages", [
      // Bài đăng
      {
        name: "10 Posts Plan",
        type: "Post",
        price: 100,
        statusCode: "active",
      },
      {
        name: "20 Posts Plan",
        type: "Post",
        price: 200,
        statusCode: "active",
      },
      {
        name: "50 Posts Plan",
        type: "Post",
        price: 450,
        statusCode: "active",
      },

      // Lượt xem
      {
        name: "100 Views Plan",
        type: "View",
        price: 50,
        statusCode: "active",
      },
      {
        name: "300 Views Plan",
        type: "View",
        price: 130,
        statusCode: "active",
      },
      {
        name: "700 Views Plan",
        type: "View",
        price: 300,
        statusCode: "active",
      },

      // VIP
      {
        name: "VIP Access Plan",
        type: "VIP",
        price: 1000,
        statusCode: "active",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Packages", null, {});
  },
};
