"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("NopCvs", {
      postId: {
        type: Sequelize.INTEGER,
      },
      cvId: {
        type: Sequelize.INTEGER,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("NopCvs");
  },
};
