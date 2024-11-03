"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Package extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //package
      Package.belongsToMany(models.User, {
        through: "UserPackage",
        foreignKey: "packageId",
        otherKey: "userId",
        as: "packageUsers",
      });
    }
  }
  Package.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.DOUBLE,
      },
      value: {
        type: DataTypes.INTEGER,
      },
      statusCode: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Package",
      timestamps: false,
    }
  );
  return Package;
};
