"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Interviews", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cvPostId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "CvPosts",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      interviewDate: {
        type: Sequelize.DATE,
      },
      interviewLocation: {
        type: Sequelize.STRING,
      },
      interviewNote: {
        type: Sequelize.DOUBLE,
      },
      statusCode: {
        type: Sequelize.STRING,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Interviews");
  },
};
