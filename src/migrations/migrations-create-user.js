"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      // firstName: DataTypes.STRING,
      // lastName: DataTypes.STRING,
      // email: DataTypes.STRING,
      // address: DataTypes.STRING,
      // phoneNumber: DataTypes.STRING,
      // password: DataTypes.STRING,
      // dob: DataTypes.DATE,
      // image: DataTypes.STRING,
      // role: DataTypes.STRING,
      // status: DataTypes.STRING,
      // isUpdate: DataTypes.TINYINT,
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
      },
      address: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },

      image: {
        type: Sequelize.STRING,
      },
      dob: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      isUpdate: {
        type: Sequelize.TINYINT,
      },

      // file: {
      //     type: Sequelize.BLOB('long')
      // }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
