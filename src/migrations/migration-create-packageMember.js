"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("PackageMembers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      packageName: {
        type: Sequelize.STRING,
        reference: {
          model: {
            tableName: "OrderPackageMembers",
          },
          key: "id",
        },
        onUpdate: "CASCADE",
      },
      duration: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.DOUBLE,
      },
      isActive: {
        type: Sequelize.TINYINT,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("PackageMembers");
  },
};
