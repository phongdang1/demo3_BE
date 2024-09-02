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
        primaryKey: true,
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
        primaryKey: true,
        onUpdate: "CASCADE",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("UserSkills");
  },
};
