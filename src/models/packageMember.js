"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PackageMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //OrderPackageMember
      PackageMember.hasMany(models.OrderPackageMember, {
        foreignKey: "packageMemberId",
        as: "packageMemberData",
      });
    }
  }
  PackageMember.init(
    {
      packageName: DataTypes.STRING,
      duration: DataTypes.INTEGER,
      price: DataTypes.DOUBLE,
      isActive: DataTypes.TINYINT,
    },
    {
      sequelize,
      modelName: "PackageMember",
      timestamps: false,
    }
  );
  return PackageMember;
};
