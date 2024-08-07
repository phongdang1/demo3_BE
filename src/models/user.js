"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Company, {
        foreignKey: "userId",
        as: "companyUserData",
      });
      // //Cv
      User.hasMany(models.Cv, { foreignKey: "userId", as: "userCvData" });

      User.hasMany(models.OrderPackagePost, {
        foreignKey: "userId",
        as: "userOrderPostData",
      });
      //OrderPackageCv
      User.hasMany(models.OrderPackageView, {
        foreignKey: "userId",
        as: "userOrderViewData",
      });
      //Post
      User.hasMany(models.Post, { foreignKey: "userId", as: "userPostData" });
      //UserDetail
      User.hasOne(models.UserDetail, {
        foreignKey: "userId",
        as: "UserDetailData",
      });
      //UserSkill - Skill
      User.belongsToMany(models.Skill, { through: models.UserSkill });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      password: DataTypes.STRING,
      dob: DataTypes.DATE,
      image: DataTypes.STRING,
      role: DataTypes.STRING,
      status: DataTypes.STRING,
      isUpdate: DataTypes.TINYINT,
    },
    {
      sequelize,
      modelName: "User",
      timestamps: false,
    }
  );
  return User;
};
