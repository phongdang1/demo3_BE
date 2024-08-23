"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserSkill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserSkill.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "userSkillData",
      });

      UserSkill.belongsTo(models.Skill, {
        foreignKey: "skillId",
        targetKey: "id",
        as: "skillData",
      });
    }
  }
  UserSkill.init(
    {
      userId: DataTypes.INTEGER,
      skillId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserSkill",
      timestamps: false,
    }
  );
  return UserSkill;
};
