"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Packages", [
      // Bài đăng
      {
        name: "10 Posts Plan",
        type: "Post",
        price: 100,
      },
      {
        name: "20 Posts Plan",
        type: "Post",
        price: 200,
      },
      {
        name: "50 Posts Plan",
        type: "Post",
        price: 450,
      },

      // Lượt xem
      {
        name: "100 Views Plan",
        type: "View",
        price: 50,
      },
      {
        name: "300 Views Plan",
        type: "View",
        price: 130,
      },
      {
        name: "700 Views Plan",
        type: "View",
        price: 300,
      },

      // VIP
      {
        name: "VIP Access Plan",
        type: "VIP",
        price: 1000,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Packages", null, {});
  },
};
