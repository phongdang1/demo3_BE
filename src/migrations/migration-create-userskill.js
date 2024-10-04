"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("UserSkills", {
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      skillId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("UserSkills");
  },
};
