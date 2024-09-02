"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("DetailPosts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT("long"),
      },
      amount: {
        type: Sequelize.INTEGER,
      },

      categoryJobCode: {
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: "Allcodes",
          },
          key: "code",
        },
        onUpdate: "CASCADE",
      },
      addressCode: {
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: "Allcodes",
          },
          key: "code",
        },
        onUpdate: "CASCADE",
      },

      salaryJobCode: {
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: "Allcodes",
          },
          key: "code",
        },
        onUpdate: "CASCADE",
      },

      joblevelCode: {
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: "Allcodes",
          },
          key: "code",
        },
        onUpdate: "CASCADE",
      },
      worktypeCode: {
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: "Allcodes",
          },
          key: "code",
        },
        onUpdate: "CASCADE",
      },
      experienceJobCode: {
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: "Allcodes",
          },
          key: "code",
        },
        onUpdate: "CASCADE",
      },
      genderPostCode: {
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: "Allcodes",
          },
          key: "code",
        },
        onUpdate: "CASCADE",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("DetailPosts");
  },
};
