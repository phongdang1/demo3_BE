"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //detailpost
      Allcode.hasMany(models.DetailPost, {
        foreignKey: "categoryJobCode",
        as: "jobTypePostData",
      });
      Allcode.hasMany(models.DetailPost, {
        foreignKey: "worktypeCode",
        as: "workTypePostData",
      });
      Allcode.hasMany(models.DetailPost, {
        foreignKey: "salaryJobCode",
        as: "salaryTypePostData",
      });
      Allcode.hasMany(models.DetailPost, {
        foreignKey: "joblevelCode",
        as: "jobLevelPostData",
      });
      Allcode.hasMany(models.DetailPost, {
        foreignKey: "experienceJobCode",
        as: "expTypePostData",
      });
      Allcode.hasMany(models.DetailPost, {
        foreignKey: "genderPostCode",
        as: "genderPostData",
      });
      Allcode.hasMany(models.DetailPost, {
        foreignKey: "addressCode",
        as: "provincePostData",
      });

      // //userDetail
      Allcode.hasMany(models.UserDetail, {
        foreignKey: "genderCode",
        as: "genderData",
      });
      Allcode.hasMany(models.UserDetail, {
        foreignKey: "categoryJobCode",
        as: "jobTypeSettingData",
      });
      Allcode.hasMany(models.UserDetail, {
        foreignKey: "salaryJobCode",
        as: "salaryTypeSettingData",
      });
      Allcode.hasMany(models.UserDetail, {
        foreignKey: "experienceJobCode",
        as: "expTypeSettingData",
      });
      Allcode.hasMany(models.UserDetail, {
        foreignKey: "addressCode",
        as: "provinceSettingData",
      });
      Allcode.hasMany(models.UserDetail, {
        foreignKey: "worktypeCode",
        as: "workTypeSettingData",
      });
      Allcode.hasMany(models.UserDetail, {
        foreignKey: "joblevelCode",
        as: "jobLevelSettingData",
      });

      //skill
      Allcode.hasMany(models.Skill, {
        foreignKey: "categoryJobCode",
        as: "jobTypeSkillSettingData",
      });
    }
  }
  Allcode.init(
    {
      type: DataTypes.STRING,
      value: DataTypes.STRING,
      code: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "Allcode",
      timestamps: false,
    }
  );
  Allcode.removeAttribute("id");
  return Allcode;
};