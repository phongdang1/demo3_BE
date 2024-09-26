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
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      statusCode: {
        type: DataTypes.STRING,
        allowNull: false,
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
