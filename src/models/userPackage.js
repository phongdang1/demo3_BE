"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserPackage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserPackage.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "userPackageData",
      });

      UserPackage.belongsTo(models.Package, {
        foreignKey: "packageId",
        targetKey: "id",
        as: "PackageData",
      });
    }
  }
  UserPackage.init(
    {
      packageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Packages",
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
      poinEarned: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      remainingView: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      remainingPost: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      vipExpiryDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      statusCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "UserPackage",
      timestamps: false,
    }
  );
  return UserPackage;
};
