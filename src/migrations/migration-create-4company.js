"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Companies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
      },
      thumbnail: {
        type: Sequelize.STRING,
      },
      coverimage: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT("long"),
      },
      website: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      phonenumber: {
        type: Sequelize.STRING,
      },
      amountEmployer: {
        type: Sequelize.INTEGER,
      },
      taxnumber: {
        type: Sequelize.STRING,
      },
      censorCode: {
        type: Sequelize.STRING,
      },
      statusCode: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
        unique: true,
      },
      censorCode: {
        type: Sequelize.STRING,
      },
      file: {
        type: Sequelize.BLOB("long"),
      },
      allowPost: {
        type: Sequelize.INTEGER,
        defaultValue: 5,
      },
      allowHotPost: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      allowCvFree: {
        type: Sequelize.INTEGER,
        defaultValue: 5,
      },
      allowCV: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Companies");
  },
};
