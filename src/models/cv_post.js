"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CvPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Association with User model
      CvPost.belongsTo(models.User, {
        foreignKey: "userId",
        as: "userCvData",
      });

      // Association with Post model
      CvPost.belongsTo(models.Post, {
        foreignKey: "postId",
        as: "postCvData",
      });
    }
  }

  CvPost.init(
    {
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Posts",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      file: {
        type: DataTypes.BLOB("long"),
        allowNull: true,
      },
      isChecked: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
      },
      statusCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "CvPost",
      timestamps: false,
    }
  );

  return CvPost;
};
