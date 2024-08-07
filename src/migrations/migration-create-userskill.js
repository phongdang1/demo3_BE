"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("UserSkills", {
      userId: {
        type: Sequelize.INTEGER,
        reference: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
        onUpdate: "CASCADE",
      },
      skillId: {
        type: Sequelize.INTEGER,
        reference: {
          model: {
            tableName: "Skills",
          },
          key: "id",
        },
        onUpdate: "CASCADE",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("UserSkills");
  },
};
