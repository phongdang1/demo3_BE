"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderPackagePost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //User
      OrderPackagePost.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "userOrderPostData",
      });

      //PackagePost
      OrderPackagePost.belongsTo(models.PackagePost, {
        foreignKey: "packagePostId",
        targetKey: "id",
        as: "packageOrderPostData",
      });
    }
  }
  OrderPackagePost.init(
    {
      packagePostId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      currentPrice: DataTypes.DOUBLE,
      amount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrderPackagePost",
    }
  );
  return OrderPackagePost;
};
