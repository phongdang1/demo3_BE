"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //User
      Report.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "reportUserData",
      });
      Report.belongsTo(models.Post, {
        foreignKey: "postId",
        targetKey: "id",
        as: "reportPostData",
      });
    }
  }
  Report.init(
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      reason: DataTypes.TEXT("long"),
      discription: DataTypes.TEXT("long"),
      isChecked: DataTypes.TINYINT,
      isAdminChecked: DataTypes.TINYINT,
    },
    {
      sequelize,
      modelName: "Report",
      timestamps: true,
    }
  );
  return Report;
};
