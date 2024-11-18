"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Posts", [
      {
        statusCode: "active", // Trạng thái bài đăng
        timeEnd: new Date("2024-10-30T23:59:59"), // Ngày kết thúc cụ thể
        userId: 1, // ID người dùng
        detailPostId: 10, // ID chi tiết bài đăng
        isHot: 1, // Nổi bật
        timePost: new Date("2024-09-13T09:00:00"), // Ngày đăng cụ thể
        note: "Hot position for experienced developers.", // Ghi chú
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        statusCode: "active",
        timeEnd: new Date("2024-10-30T23:59:59"),
        userId: 2,
        detailPostId: 12,
        isHot: 0,
        timePost: new Date("2024-09-13T09:00:00"),
        note: "Backend developer position.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        statusCode: "inactive",
        timeEnd: new Date("2024-10-30T23:59:59"),
        userId: 3,
        detailPostId: 11,
        isHot: 0,
        timePost: new Date("2024-09-13T09:00:00"),
        note: "Project Manager role.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Posts", null, {});
  },
};
