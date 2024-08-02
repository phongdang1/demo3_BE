"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PackageView extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //orderpackage
      PackageView.hasMany(models.OrderPackageView, {
        foreignKey: "packageViewId",
        as: "packageOrderViewData",
      });
    }
  }
  PackageView.init(
    {
      name: DataTypes.STRING,
      value: DataTypes.INTEGER,
      price: DataTypes.DOUBLE,
      isActive: DataTypes.TINYINT,
    },
    {
      sequelize,
      modelName: "PackageView",
      timestamps: false,
    }
  );
  return PackageView;
};
