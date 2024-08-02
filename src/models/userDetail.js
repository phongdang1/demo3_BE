"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //Allcode
      UserDetail.belongsTo(models.Allcode, {
        foreignKey: "categoryJobCode",
        targetKey: "code",
        as: "jobTypeSettingData",
      });
      UserDetail.belongsTo(models.Allcode, {
        foreignKey: "salaryJobCode",
        targetKey: "code",
        as: "salaryTypeSettingData",
      });
      UserDetail.belongsTo(models.Allcode, {
        foreignKey: "experienceJobCode",
        targetKey: "code",
        as: "expTypeSettingData",
      });
      UserDetail.belongsTo(models.Allcode, {
        foreignKey: "addressCode",
        targetKey: "code",
        as: "provinceSettingData",
      });
      UserDetail.belongsTo(models.Allcode, {
        foreignKey: "genderCode",
        targetKey: "code",
        as: "genderSettingData",
      });
      UserDetail.belongsTo(models.Allcode, {
        foreignKey: "jobLevelCode",
        targetKey: "code",
        as: "jobLevelSettingData",
      });
      UserDetail.belongsTo(models.Allcode, {
        foreignKey: "workTypeCode",
        targetKey: "code",
        as: "workTypeSettingData",
      });

      //User
      UserDetail.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "UserDetailData",
      });
    }
  }
  UserDetail.init(
    {
      userId: DataTypes.INTEGER,
      addressCode: DataTypes.STRING,
      salaryJobCode: DataTypes.STRING,
      experienceJobCode: DataTypes.STRING,
      genderCode: DataTypes.STRING,
      categoryJobCode: DataTypes.STRING,
      jobLevelCode: DataTypes.STRING,
      workTypeCode: DataTypes.STRING,
      isTakeMail: DataTypes.TINYINT,
      isFindJob: DataTypes.TINYINT,
      file: DataTypes.BLOB("long"),
    },
    {
      sequelize,
      modelName: "UserDetail",
      timestamps: false,
    }
  );
  return UserDetail;
};
