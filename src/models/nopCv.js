"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NopCv extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      NopCv.belongsTo(models.Cv, {
        foreignKey: "cvId",
        targetKey: "id",
        as: "userNopCvData",
      });

      NopCv.belongsTo(models.Post, {
        foreignKey: "postId",
        targetKey: "id",
        as: "postNopCvData",
      });
    }
  }
  NopCv.init(
    {},
    {
      sequelize,
      modelName: "NopCv",
      timestamps: false,
    }
  );
  return NopCv;
};
