"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderPackageMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //ser
      OrderPackageMember.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "userOrderCvData",
      });
      //PackageView
      OrderPackageMember.belongsTo(models.PackageMember, {
        foreignKey: "packageMemberId",
        targetKey: "id",
        as: "packageOrderViewData",
      });
    }
  }
  OrderPackageMember.init(
    {
      packageMemberId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      currentPrice: DataTypes.DOUBLE,
      startDate: DataTypes.DATE,
      expiryDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "OrderPackageMember",
    }
  );
  return OrderPackageMember;
};
