"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderPackageView extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //User
      OrderPackageView.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "userOrderCvData",
      });

      //PackageView
      OrderPackageView.belongsTo(models.PackageView, {
        foreignKey: "packageViewId",
        targetKey: "id",
        as: "packageOrderViewData",
      });
    }
  }
  OrderPackageView.init(
    {
      packageViewId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      currentPrice: DataTypes.DOUBLE,
      amount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrderPackageView",
    }
  );
  return OrderPackageView;
};
