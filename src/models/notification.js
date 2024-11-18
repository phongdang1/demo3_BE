"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //User
      Notification.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "notificationUserData",
      });
    }
  }
  Notification.init(
    {
      userId: DataTypes.INTEGER,
      content: DataTypes.TEXT("long"),
      isChecked: DataTypes.TINYINT,
    },
    {
      sequelize,
      modelName: "Notification",
      timestamps: true,
    }
  );
  return Notification;
};
