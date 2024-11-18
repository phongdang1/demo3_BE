"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("UserSkills", [
      // Người dùng 1
      { userId: 1, skillId: 1 },
      { userId: 1, skillId: 8 },
      { userId: 1, skillId: 17 },
      { userId: 1, skillId: 18 },

      // Người dùng 2
      { userId: 2, skillId: 2 },
      { userId: 2, skillId: 9 },
      { userId: 2, skillId: 11 },
      { userId: 2, skillId: 28 },

      // Người dùng 3
      { userId: 3, skillId: 19 },
      { userId: 3, skillId: 21 },
      { userId: 3, skillId: 72 },
      { userId: 3, skillId: 73 },

      // Thêm các bản ghi khác cho người dùng từ 4 đến 10
      { userId: 4, skillId: 6 },
      { userId: 4, skillId: 16 },
      { userId: 4, skillId: 23 },
      { userId: 4, skillId: 63 },

      { userId: 5, skillId: 7 },
      { userId: 5, skillId: 22 },
      { userId: 5, skillId: 66 },
      { userId: 5, skillId: 67 },

      { userId: 6, skillId: 20 },
      { userId: 6, skillId: 69 },
      { userId: 6, skillId: 70 },
      { userId: 6, skillId: 71 },

      { userId: 7, skillId: 24 },
      { userId: 7, skillId: 59 },
      { userId: 7, skillId: 60 },
      { userId: 7, skillId: 61 },

      { userId: 8, skillId: 25 },
      { userId: 8, skillId: 27 },
      { userId: 8, skillId: 55 },
      { userId: 8, skillId: 56 },

      { userId: 9, skillId: 57 },
      { userId: 9, skillId: 58 },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("UserSkills", null, {});
  },
};
