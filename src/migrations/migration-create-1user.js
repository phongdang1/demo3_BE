"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      address: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      point: {
        type: Sequelize.INTEGER,
      },
      image: {
        type: Sequelize.STRING,
      },
      dob: {
        type: Sequelize.STRING,
      },
      roleCode: {
        type: Sequelize.STRING,
      },
      statusCode: {
        type: Sequelize.STRING,
      },
      typeLogin: {
        type: Sequelize.STRING,
      },
      isVerify: {
        type: Sequelize.TINYINT,
      },

      isUpdate: {
        type: Sequelize.TINYINT,
      },
      isVip: {
        type: Sequelize.TINYINT,
      },
      companyId: {
        type: Sequelize.INTEGER,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
